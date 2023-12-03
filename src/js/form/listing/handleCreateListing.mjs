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
  const addButton = document.getElementById('listing-image-add');
  const imageInput = document.getElementById('listing-image');
  const imageList = document.getElementById('listing-image-added');
  let mediaGallery = [];

  addButton.addEventListener('click', (event) => {
    event.preventDefault();
    const imageUrl = imageInput.value;
    if (imageUrl) {
      mediaGallery.push(imageUrl);
      imageList.textContent = mediaGallery.join(', ');
      imageInput.value = '';
    }
  });

  if (!form || !submitButton || !progressButton || !successButton) return;

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const title = document.getElementById('listing-title').value;
    const during = document.getElementById('listing-during').value;
    const description = document.getElementById('listing-description').value;
    const tagifyTags = document.getElementById('listing-tags').value;

    let tags = [];
    try {
      tags = JSON.parse(tagifyTags).map((tagObject) => tagObject.value);
    } catch (error) {
      console.error('Error parsing tags JSON:', error);
      return;
    }

    // Check if imageInput is not empty and automatically add the image URL
    const imageInputValue = imageInput.value;
    if (imageInputValue.trim() !== '') {
      mediaGallery.push(imageInputValue);
      imageList.textContent = mediaGallery.join(', ');
      imageInput.value = '';
    }

    // Title Validation
    if (title.length < 3) {
      alert('Title must be at least 3 characters long.');
      submitButton.classList.remove('hidden');
      return;
    }

    // Description Validation
    if (description.length > 199) {
      alert('Description must be 199 characters or less.');
      submitButton.classList.remove('hidden');
      return;
    }

    // End Date Validation
    if (during === '' || during === 'During') {
      alert('Please select a valid end date for the auction.');
      submitButton.classList.remove('hidden');
      return;
    }

    submitButton.classList.add('hidden');
    progressButton.classList.remove('hidden');
    progressButton.classList.add('inline-flex');
    const accessToken = localStorage.getItem('accessToken');

    const endsAt = calculateEndDate(during);

    const data = {
      title,
      description,
      tags,
      media: mediaGallery,
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
        progressButton.classList.remove('inline-flex');
        progressButton.classList.add('hidden');
        successButton.classList.remove('hidden');
        successButton.classList.add('inline-flex');

        // Clear the form fields and mediaGallery for the next listing
        setTimeout(() => {
          successButton.classList.add('hidden');
          submitButton.classList.remove('hidden');
          clearFormFields();
          document.querySelector('[data-modal-hide="listing-modal"]').click();
        }, 1500);
      }, 2000);
    } catch (error) {
      console.error('Error creating listing:', error);
      progressButton.classList.add('hidden');
      submitButton.classList.remove('hidden');
    }
  });

  // Function to clear form fields and mediaGallery
  function clearFormFields() {
    document.getElementById('listing-title').value = '';
    document.getElementById('listing-during').value = '';
    document.getElementById('listing-description').value = '';
    document.getElementById('listing-tags').value = 'Sale, Auction, Bid';
    imageInput.value = '';
    mediaGallery = [];
    imageList.textContent = 'Not added';
  }
}

function calculateEndDate(during) {
  const now = new Date();
  switch (during) {
    case '3d':
      return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString();
    case '5d':
      return new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString();
    case '7d':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    case '30d':
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    default:
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
  }
}
