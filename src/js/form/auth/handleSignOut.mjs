export function handleSignOut() {
  const signOutLink = document.getElementById('sign-out');
  const authButtons = document.getElementById('auth-buttons');
  const userButton = document.getElementById('user-menu-button');
  const userMenuButton = document.getElementById('user-menu-button');

  signOutLink.addEventListener('click', (event) => {
    event.preventDefault();

    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('avatar');
    localStorage.removeItem('credits');

    // Update UI
    if (authButtons) {
      authButtons.style.display = 'flex';
    }
    if (userButton) {
      userButton.style.display = 'none';
    }
    if (userMenuButton) {
      userMenuButton.click();
    }
    window.location.href = '/Semester-Project-2_CA/';
  });
}
