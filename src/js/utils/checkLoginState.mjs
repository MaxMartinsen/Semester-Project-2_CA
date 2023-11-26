import { updateUserInfo } from './updateUserInfo.mjs';

export function checkLoginState() {
  const accessToken = localStorage.getItem('accessToken');
  const authButtons = document.getElementById('auth-buttons');
  const userButton = document.getElementById('user-menu-button');
  const userAvatar = document.getElementById('user-avatar');

  if (accessToken) {
    if (authButtons) {
      authButtons.style.display = 'none';
    }
    if (userButton) {
      userButton.style.display = 'flex';
      const avatar = localStorage.getItem('avatar');
      const name = localStorage.getItem('name');
      if (userAvatar && avatar) {
        userAvatar.src = avatar;
        userAvatar.alt = name || 'User';
      }
    }
    updateUserInfo();
  }
}
