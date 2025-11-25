import { useServerSupabase } from "~/server/utils/supabase-client";

const extractBearerToken = (authorizationHeader: string | undefined | null) => {
  if (!authorizationHeader) {
    return null;
  }

  const parts = authorizationHeader.split(" ");
  if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
    return parts[1];
  }

  return null;
};

export default defineEventHandler(async (event) => {
  const supabase = useServerSupabase();
  const token = extractBearerToken(getHeader(event, "authorization"));

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Missing bearer token",
    });
  }

  const { data: authUser, error: authError } = await supabase.auth.getUser(token);

  if (authError || !authUser?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid authentication token",
    });
  }

  const userId = authUser.user.id;

  // Expect JSON payload with base64 file
  const body = await readBody(event) as any;
  const { filename, mimeType, size, b64 } = body ?? {};

  if (!filename || !mimeType || !size || !b64) {
    throw createError({ statusCode: 400, statusMessage: "Missing file payload" });
  }

  // Validate mime and size (1MB max)
  const allowed = ["application/pdf", "image/jpeg", "image/jpg"];
  if (!allowed.includes(mimeType)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid file type" });
  }

  if (Number(size) > 1_048_576) {
    throw createError({ statusCode: 400, statusMessage: "File too large" });
  }

  // Convert base64 to buffer
  const buffer = Buffer.from(b64, "base64");

  // Bucket name from runtime config or default
  const config = useRuntimeConfig();
  const bucket = config.public?.certsBucketName ?? config.certsBucketName ?? "zapmindscertificate";

  // Create storage path
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `user_certificates/${userId}/${Date.now()}-${Math.random().toString(36).slice(2,8)}-${safeName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage.from(bucket).upload(storagePath, buffer, {
    contentType: mimeType,
    upsert: false,
  });

  if (uploadError) {
    console.error("[upload] storage error:", uploadError);
    throw createError({ statusCode: 500, statusMessage: `Storage upload failed: ${uploadError.message}` });
  }

  // Persist metadata in user_certificates table
  const { data: insertData, error: insertError } = await supabase.from("user_certificates").insert([
    {
      user_id: userId,
      storage_path: uploadData?.path ?? storagePath,
      filename,
      mime: mimeType,
      size: Number(size),
    } as any,
  ]).select("id, user_id, storage_path, filename, mime, size, created_at");

  if (insertError) {
    console.error("[upload] db insert error:", insertError);
    throw createError({ statusCode: 500, statusMessage: `Failed to record metadata: ${insertError.message}` });
  }

  return {
    ok: true,
    certificate: insertData?.[0] ?? null,
  };
});
