export function hideSignUpModal() {
  const signUpModal = document.getElementById('sign-up-modal');
  if (signUpModal) {
    signUpModal.classList.add('hidden');
  }
}
