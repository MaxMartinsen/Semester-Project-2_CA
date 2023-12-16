import { put } from '../../request/request.mjs';
import {
  API_BASE_URL,
  API_VERSION,
  PROFILES_ENDPOINT,
} from '../../api/url.mjs';
import { updateAvatar } from '../../utils/utils.mjs';

export function handleUpdateAvatar() {
  const settingsAcceptButton = document.getElementById('settings-user-accept');
  const defaultAvatarUrl = '';

  if (settingsAcceptButton) {
    settingsAcceptButton.addEventListener('click', async () => {
      const avatarUrlInput = document.getElementById('settings-user-url');
      const avatarUrl = avatarUrlInput.value.trim();
      const userName = localStorage.getItem('name');
      const accessToken = localStorage.getItem('accessToken');

      if (!avatarUrl) {
        updateAvatar(defaultAvatarUrl);
        window.location.href = '/Semester-Project-2_CA/';
        return;
      }

      try {
        const response = await put(
          `${API_BASE_URL}${API_VERSION}${PROFILES_ENDPOINT}/${userName}/media`,
          { avatar: avatarUrl },
          accessToken
        );

        if (response && response.avatar) {
          updateAvatar(response.avatar);
        } else {
          updateAvatar(defaultAvatarUrl);
        }
      } catch (error) {
        console.error('Failed to update avatar:', error);
        updateAvatar(defaultAvatarUrl);
      }
    });
  }
}
