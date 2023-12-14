import './src/index.css';
import 'flowbite';
import './src/css/iconsfont.css';
import {
  handleRegistration,
  handleLogin,
  handleSignOut,
} from './src/js/form/auth/auth.mjs';
import {
  updateSettingsModal,
  checkLoginState,
  updateUserCredits,
} from './src/js/utils/utils.mjs';
import { handleUpdateAvatar } from './src/js/form/profile/handleUpdateAvatar.mjs';
import { loadListings, initializeSearch } from './src/js/listing/listing.mjs';
import { initializeTagify } from './src/js/tagify/initializeTagify.mjs';
import { handleCreateListing } from './src/js/form/listing/handleCreateListing.mjs';
import { handleCloseButton } from './src/js/components/components.mjs';

document.addEventListener('DOMContentLoaded', () => {
  handleRegistration();
  handleLogin();
  checkLoginState();
  handleSignOut();
  handleUpdateAvatar();
  loadListings();
  updateUserCredits();
  initializeTagify();
  handleCreateListing();
  initializeSearch();
  handleCloseButton();
  // Settings modal observer setup
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
