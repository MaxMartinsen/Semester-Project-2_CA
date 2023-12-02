import { post } from '../../request/post.mjs';
import {
  API_BASE_URL,
  API_VERSION,
  LISTINGS_ENDPOINT,
} from '../../api/url.mjs';

export function handleCreateListing() {
  const form = document.getElementById('listing-modal');
  const submitButton = document.getElementById('listing-submit');

  if (!form || !submitButton) return;

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
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
    } catch (error) {
      console.error('Error creating listing:', error);
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
