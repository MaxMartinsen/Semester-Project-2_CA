import { get } from '../request/get.mjs';
import { API_BASE_URL, API_VERSION, LISTINGS_ENDPOINT } from '../api/url.mjs';

export async function loadSingleListing(listingId) {
  try {
    const url = `${API_BASE_URL}${API_VERSION}${LISTINGS_ENDPOINT}/${listingId}`;
    const listing = await get(url);
    updateSingleListing(listing);
  } catch (error) {
    console.error('Failed to load single listing:', error);
  }
}

function updateSingleListing(listing) {
  const singleCardContent = document.getElementById('single-card-content');
  const cardContent = document.getElementById('card-content');
  const carouselWrapper = document.getElementById('single-card-carousel');
  const titleElement = document.getElementById('single-card-title');
  const descriptionElement = document.getElementById('single-card-description');
  const prevButton = document.getElementById('single-card-media-prev');
  const nextButton = document.getElementById('single-card-media-next');
  let currentIndex = 0;

  if (
    !singleCardContent ||
    !cardContent ||
    !carouselWrapper ||
    !titleElement ||
    !descriptionElement
  ) {
    console.error('Required DOM elements not found');
    return;
  }

  function updateCarousel() {
    carouselWrapper.innerHTML = '';
    const mediaItems =
      listing.media && listing.media.length > 0
        ? listing.media
        : ['/image.jpg'];

    mediaItems.forEach((imageUrl, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = `duration-200 ease-linear ${
        index === currentIndex ? '' : 'hidden'
      }`;
      carouselItem.setAttribute('data-carousel-item', '');

      const img = document.createElement('img');
      img.src = imageUrl;
      img.className =
        'absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2';
      img.alt = `Image ${index + 1}`;

      carouselItem.appendChild(img);
      carouselWrapper.appendChild(carouselItem);
    });
  }

  function showNextImage() {
    currentIndex =
      (currentIndex + 1) % (listing.media ? listing.media.length : 1);
    updateCarousel();
  }

  function showPrevImage() {
    currentIndex =
      (currentIndex - 1 + (listing.media ? listing.media.length : 1)) %
      (listing.media ? listing.media.length : 1);
    updateCarousel();
  }

  prevButton.addEventListener('click', showPrevImage);
  nextButton.addEventListener('click', showNextImage);

  updateCarousel(); // Initialize the carousel with the first image

  titleElement.textContent = listing.title;
  descriptionElement.textContent = listing.description;

  cardContent.classList.add('hidden');
  singleCardContent.classList.remove('hidden');
  singleCardContent.classList.add('grid');
}
