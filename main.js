import './src/index.css';
import 'flowbite';
import './src/css/iconsfont.css';
import { handleRegistration } from './src/js/form/auth/handleRegistration.mjs';
import { handleLogin } from './src/js/form/auth/handleLogin.mjs';
import { handleSignOut } from './src/js/form/auth/handleSignOut.mjs';
import { updateSettingsModal, checkLoginState } from './src/js/utils/utils.mjs';
import { handleUpdateAvatar } from './src/js/form/profile/handleUpdateAvatar.mjs';
import { loadListings } from './src/js/listing/listing.mjs';

document.addEventListener('DOMContentLoaded', () => {
  handleRegistration();
  handleLogin();
  checkLoginState();
  handleSignOut();
  handleUpdateAvatar();
  loadListings();

  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isModalOpen = !settingsModal.classList.contains('hidden');
          if (isModalOpen) {
            updateSettingsModal();
          }
        }
      });
    });

    observer.observe(settingsModal, { attributes: true });

    window.addEventListener('unload', () => observer.disconnect());
  }
});

/* import { toggleTabs } from './src/js/components/components.mjs'; */

/* document.addEventListener('DOMContentLoaded', () => {
  toggleTabs('.tab-trigger', '.tab-content');
}); */
