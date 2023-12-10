import { post } from '../../request/post.mjs';
import {
  API_BASE_URL,
  API_VERSION,
  REGISTER_ENDPOINT,
} from '../../api/url.mjs';
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../../validation/validation.mjs';

export function handleRegistration() {
  const signUpForm = document.getElementById('sign-up-form');
  const signUpFormBody = document.getElementById('sign-up-form-body');
  const signUpSuccessBody = document.getElementById('sign-up-success-body');
  const signUpErrorBody = document.getElementById('sign-up-error-body');
  const nameInput = document.getElementById('name-sign-up');
  const nameError = document.getElementById('name-error');
  const emailInput = document.getElementById('email-sign-up');
  const emailError = document.getElementById('sign-up-email-error');
  const passwordInput = document.getElementById('sign-up-password');
  const passwordError = document.getElementById('sign-up-password-error');

  if (signUpForm) {
    signUpForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = nameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;
      const avatar = document.getElementById('avatar-sign-up').value;

      // Validate name
      if (!validateName(name)) {
        nameError.classList.remove('hidden');
        return;
      } else {
        nameError.classList.add('hidden');
      }
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
          `${API_BASE_URL}${API_VERSION}${REGISTER_ENDPOINT}`,
          { name, email, password, avatar }
        );

        console.log('Registration response:', response);

        if (signUpFormBody && signUpSuccessBody) {
          signUpFormBody.style.display = 'none';
          signUpSuccessBody.style.display = 'block';
        }
      } catch (error) {
        console.error('Registration failed:', error);
        if (signUpFormBody && signUpErrorBody) {
          signUpFormBody.style.display = 'none';
          signUpErrorBody.style.display = 'block';
        }
      }
    });
  } else {
    console.error('Sign-up form not found in the DOM');
    if (signUpFormBody && signUpErrorBody) {
      signUpFormBody.style.display = 'none';
      signUpErrorBody.style.display = 'block';
    }
  }
}
