export function handleCloseButton() {
  const closeButtons = document.querySelectorAll('.close-modal');

  closeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      window.location.reload();
    });
  });
}
