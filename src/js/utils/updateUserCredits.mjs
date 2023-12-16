import { get } from '../request/request.mjs';
import { API_BASE_URL, API_VERSION, PROFILES_ENDPOINT } from '../api/url.mjs';

export async function updateUserCredits() {
  const userName = localStorage.getItem('name');
  const accessToken = localStorage.getItem('accessToken');
  const userCreditsElement = document.getElementById('user-credits');

  if (!userName || !accessToken) {
    if (userCreditsElement) {
      userCreditsElement.textContent = '';
    }
    return;
  }

  try {
    const url = `${API_BASE_URL}${API_VERSION}${PROFILES_ENDPOINT}/${userName}`;
    const profile = await get(url, accessToken);

    if (profile && profile.credits !== undefined) {
      if (userCreditsElement) {
        userCreditsElement.textContent = ` ${profile.credits}`;
      }
    }
  } catch (error) {
    console.error('Failed to fetch user credits:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const userMenuButton = document.getElementById('user-menu-button');
  const userDropdown = document.getElementById('user-dropdown');

  if (userMenuButton) {
    userMenuButton.addEventListener('click', () => {
      updateUserCredits();
      userDropdown.classList.toggle('hidden');
    });
  }
});
