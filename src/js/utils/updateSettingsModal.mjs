export function updateSettingsModal() {
  const userAvatar = document.getElementById('settings-user-avatar');
  const userName = document.getElementById('settings-user-name');
  const userEmail = document.getElementById('settings-user-email');
  const userUrl = document.getElementById('settings-user-url');

  const avatar = localStorage.getItem('avatar');
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  if (userAvatar && avatar) {
    userAvatar.src = avatar;
  }

  if (userName && name) {
    userName.textContent = name;
  }

  if (userEmail && email) {
    userEmail.textContent = email;
  }

  if (userUrl && avatar) {
    userUrl.value = avatar;
  }
}
