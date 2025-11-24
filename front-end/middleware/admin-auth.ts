// middleware/admin-auth.ts
export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, isAdmin } = useStudentAuth();

  // Not logged in → login page
  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }

  // Logged in but not admin → normal dashboard
  if (!isAdmin.value) {
    return navigateTo("/dashboard");
  }

  // Admins fall through and see the page
});
