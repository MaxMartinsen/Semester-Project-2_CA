import { post } from '../../request/post.mjs';
import { API_BASE_URL, API_VERSION, LOGIN_ENDPOINT } from '../../api/url.mjs';
import {
  updateUserInfo,
  clearLoginForm,
  updateSettingsModal,
} from '../../utils/utils.mjs';
import {
  validateEmail,
  validatePassword,
} from '../../validation/validation.mjs';

export function handleLogin() {
  const loginForm = document.getElementById('login-form');
  const loginErrorBody = document.getElementById('login-error-body');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const closeButton = document.getElementById('close-login-modal');

  if (closeButton) {
    closeButton.addEventListener('click', clearLoginForm);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;
      const authButtons = document.getElementById('auth-buttons');
      const userButton = document.getElementById('user-menu-button');
      const userAvatar = document.getElementById('user-avatar');

      // Validate email
      if (!validateEmail(email)) {
        emailError.classList.remove('hidden');
        return;
      } else {
        emailError.classList.add('hidden');
      }

      // Validate password
      if (!validatePassword(password)) {
        passwordError.classList.remove('hidden');
        return;
      } else {
        passwordError.classList.add('hidden');
      }

      try {
        const response = await post(
          `${API_BASE_URL}${API_VERSION}${LOGIN_ENDPOINT}`,
          { email, password }
        );

        console.log('Response from API:', response);

        if (response && response.accessToken) {
          localStorage.setItem('credits', response.credits);
          localStorage.setItem('avatar', response.avatar);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('email', response.email);
          localStorage.setItem('name', response.name);

          updateUserInfo();
          updateSettingsModal();

          closeButton.click();

          if (authButtons) {
            authButtons.style.display = 'none';
          }
          if (userButton) {
            userButton.style.display = 'flex';
            if (userAvatar && response.avatar) {
              userAvatar.src = response.avatar;
              userAvatar.alt = response.name;
            }
          }

          console.log('Login response stored in localStorage');
        } else {
          console.error('No access token in response');
        }
      } catch (error) {
        console.error('Login failed', error);
        if (loginForm && loginErrorBody) {
          loginForm.style.display = 'none';
          loginErrorBody.style.display = 'block';
        }
      }
    });
  } else {
    console.error('Login form not found in the DOM');
    if (loginForm && loginErrorBody) {
      loginForm.style.display = 'none';
      loginErrorBody.style.display = 'block';
    }
  }
}
