import { post } from '../../request/post.mjs';
import {
  API_BASE_URL,
  API_VERSION,
  LISTINGS_ENDPOINT,
} from '../../api/url.mjs';

export function handleCreateListing() {
  const form = document.getElementById('listing-modal');
  const submitButton = document.getElementById('listing-submit');
  const progressButton = document.getElementById('listing-progress');
  const successButton = document.getElementById('listing-success');

  if (!form || !submitButton || !progressButton || !successButton) return;

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    submitButton.classList.add('hidden');
    progressButton.classList.remove('hidden');
    const accessToken = localStorage.getItem('accessToken');
    const title = document.getElementById('listing-title').value;
    const during = document.getElementById('listing-during').value;
    const image = document.getElementById('listing-image').value;
    const description = document.getElementById('listing-description').value;
    const tagifyTags = document.getElementById('listing-tags').value;
    const tags = JSON.parse(tagifyTags).map((tagObject) => tagObject.value);

    const endsAt = calculateEndDate(during);

    const data = {
      title,
      description,
      tags,
      media: [image],
      endsAt,
    };

    try {
      const response = await post(
        `${API_BASE_URL}${API_VERSION}${LISTINGS_ENDPOINT}`,
        data,
        accessToken
      );
      console.log('Listing created:', response);

      // Change to success button and close modal after a delay
      setTimeout(() => {
        progressButton.classList.add('hidden');
        successButton.classList.remove('hidden');

        // Close modal after additional delay
        setTimeout(() => {
          document.querySelector('[data-modal-hide="listing-modal"]').click();
        }, 1500);
      }, 2000);
    } catch (error) {
      console.error('Error creating listing:', error);
      progressButton.classList.add('hidden');
      submitButton.classList.remove('hidden');
    }
  });
}

function calculateEndDate(during) {
  const now = new Date();
  switch (during) {
    case '3d':
      return new Date(now.setDate(now.getDate() + 3)).toISOString();
    case '5d':
      return new Date(now.setDate(now.getDate() + 5)).toISOString();
    case '7d':
      return new Date(now.setDate(now.getDate() + 7)).toISOString();
    case '30d':
      return new Date(now.setDate(now.getDate() + 30)).toISOString();
    default:
      return new Date(now.setDate(now.getDate() + 7)).toISOString();
  }
}
