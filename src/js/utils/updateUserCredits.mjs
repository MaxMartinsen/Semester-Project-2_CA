import { get } from '../request/request.mjs';
import { API_BASE_URL, API_VERSION, PROFILES_ENDPOINT } from '../api/url.mjs';

export async function updateUserCredits() {
  try {
    const userName = localStorage.getItem('name');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

    if (!userName) {
      console.error('User name not found');
      return;
    }

    const url = `${API_BASE_URL}${API_VERSION}${PROFILES_ENDPOINT}/${userName}`;
    const profile = await get(url, accessToken); // Pass the access token

    if (profile && profile.credits !== undefined) {
      const userCreditsElement = document.getElementById('user-credits');
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
      updateUserCredits(); // Fetch and update user credits
      userDropdown.classList.toggle('hidden');
    });
  }
});
