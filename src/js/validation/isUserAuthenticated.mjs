export function isUserAuthenticated() {
  // Check if the token exists in local storage
  const token = localStorage.getItem('accessToken');

  return token !== null;
}
