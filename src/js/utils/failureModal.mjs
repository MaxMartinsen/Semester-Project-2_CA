export function showFailureModal() {
  const modal = document.getElementById('sign-up-failed');
  modal.classList.remove('hidden');
}

export function hideFailureModal() {
  const modal = document.getElementById('sign-up-failed');
  modal.classList.add('hidden');
}
