export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@stud\.noroff\.no$/;
  return regex.test(email);
}
