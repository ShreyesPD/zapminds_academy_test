// export default defineNuxtRouteMiddleware(() => {
//   const { isAuthenticated } = useStudentAuth();

//   if (isAuthenticated.value) {
//     return navigateTo("/dashboard");
//   }
// });

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, isAdmin } = useStudentAuth();

  if (!isAuthenticated.value) return;

  if (isAdmin.value) {
    return navigateTo("/admin");
  }

  return navigateTo("/dashboard");
});
