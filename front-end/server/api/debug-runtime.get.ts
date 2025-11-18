export default defineEventHandler(() => {
  // Only returns public runtime config (safe). Remove this endpoint after debugging.
  return { publicRuntime: useRuntimeConfig().public ?? {} }
})
