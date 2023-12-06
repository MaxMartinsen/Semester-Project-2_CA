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

  if (!singleCardContent || !cardContent) {
    console.error('Required DOM elements not found');
    return;
  }

  const titleElement = document.getElementById('single-card-title');
  const descriptionElement = document.getElementById('single-card-description');

  if (titleElement) titleElement.textContent = listing.title;
  if (descriptionElement) descriptionElement.textContent = listing.description;

  cardContent.classList.add('hidden');
  singleCardContent.classList.remove('hidden');
  singleCardContent.classList.add('grid');
}
