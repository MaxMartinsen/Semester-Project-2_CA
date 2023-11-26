import './src/index.css';
import 'flowbite';
import './src/css/iconsfont.css';
import { handleRegistration } from './src/js/form/auth/handleRegistration.mjs';
import { handleLogin } from './src/js/form/auth/handleLogin.mjs';
import { checkLoginState } from './src/js/utils/checkLoginState.mjs';
import { handleSignOut } from './src/js/form/auth/handleSignOut.mjs';

document.addEventListener('DOMContentLoaded', () => {
  handleRegistration();
  handleLogin();
  checkLoginState();
  handleSignOut();
});

/* import { toggleTabs } from './src/js/components/components.mjs'; */

/* document.addEventListener('DOMContentLoaded', () => {
  toggleTabs('.tab-trigger', '.tab-content');
}); */
