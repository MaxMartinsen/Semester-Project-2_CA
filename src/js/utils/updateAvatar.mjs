export function updateAvatar(newAvatarUrl) {
  const userAvatar = document.getElementById('user-avatar');
  if (userAvatar) {
    userAvatar.src = newAvatarUrl;
  }
  localStorage.setItem('avatar', newAvatarUrl);
}
