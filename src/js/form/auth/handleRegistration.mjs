// src/js/form/auth/handleRegistration.mjs
import { post } from '../../request/post.mjs';
import {
  API_BASE_URL,
  API_VERSION,
  REGISTER_ENDPOINT,
} from '../../api/url.mjs';

export function handleRegistration() {
  const signUpForm = document.getElementById('sign-up-form');
  const signUpFormBody = document.getElementById('sign-up-form-body');
  const signUpSuccessBody = document.getElementById('sign-up-success-body');

  if (signUpForm) {
    signUpForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name-sign-up').value;
      const email = document.getElementById('email-sign-up').value;
      const password = document.getElementById('password-sign-up').value;
      const avatar = document.getElementById('avatar-sign-up').value;

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
      }
    });
  } else {
    console.error('Sign-up form not found in the DOM');
  }
}
