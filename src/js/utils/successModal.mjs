export function showSuccessModal() {
  const modal = document.getElementById('sign-up-success');
  modal.classList.remove('hidden');
}

export function hideSuccessModal() {
  const modal = document.getElementById('sign-up-success');
  modal.classList.add('hidden');
}
