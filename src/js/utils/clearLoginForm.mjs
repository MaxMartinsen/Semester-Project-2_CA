export function clearLoginForm() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (emailInput) {
    emailInput.value = '';
  }
  if (passwordInput) {
    passwordInput.value = '';
  }
}
