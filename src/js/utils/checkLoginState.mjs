import { updateUserInfo } from './updateUserInfo.mjs';

export function checkLoginState() {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const authButtons = document.getElementById('auth-buttons');
    const userButton = document.getElementById('user-menu-button');
    const userAvatar = document.getElementById('user-avatar');

    if (authButtons) {
      authButtons.style.display = 'none';
    }
    if (userButton) {
      userButton.style.display = 'flex';
    }
    if (userAvatar) {
      const avatar = localStorage.getItem('avatar');
      const name = localStorage.getItem('name');
      userAvatar.src = avatar || '/Semester-Project-2_CA/user.svg';

      userAvatar.alt = name || 'user avatar';
    }

    updateUserInfo();
  }
}
