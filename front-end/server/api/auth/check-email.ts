import { getSupabaseServiceClient } from "~/server/utils/supabase-client";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string }>(event);
  const email = body?.email?.trim().toLowerCase();

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email is required",
    });
  }

  //   // Validate format first (prevents unnecessary admin calls)
  //   const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  //   if (!isValid) {
  //     return { exists: false };
  //   }

  const admin = getSupabaseServiceClient();

  // Fetch ONLY this email, not entire user list
  const { data, error } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (error) {
    console.error("Email check failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to check email",
    });
  }

  const exists = data.users.some((u) => u.email?.toLowerCase() === email);

  return { exists };
});
