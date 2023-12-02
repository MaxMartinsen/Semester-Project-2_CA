import './src/index.css';
import 'flowbite';
import './src/css/iconsfont.css';
import { handleRegistration } from './src/js/form/auth/handleRegistration.mjs';
import { handleLogin } from './src/js/form/auth/handleLogin.mjs';
import { handleSignOut } from './src/js/form/auth/handleSignOut.mjs';
import { updateSettingsModal, checkLoginState } from './src/js/utils/utils.mjs';
import { handleUpdateAvatar } from './src/js/form/profile/handleUpdateAvatar.mjs';
import { loadListings } from './src/js/listing/listing.mjs';
import { initializeTagify } from './src/js/tagify/initializeTagify.mjs';
import { handleCreateListing } from './src/js/form/listing/handleCreateListing.mjs';

document.addEventListener('DOMContentLoaded', () => {
  handleRegistration();
  handleLogin();
  checkLoginState();
  handleSignOut();
  handleUpdateAvatar();
  loadListings();
  setInterval(loadListings, 30000);
  initializeTagify();
  handleCreateListing();

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
