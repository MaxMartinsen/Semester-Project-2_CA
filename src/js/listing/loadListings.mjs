import { get } from '../request/get.mjs';
import { API_BASE_URL, API_VERSION, LISTINGS_ENDPOINT } from '../api/url.mjs';

export async function loadListings() {
  try {
    const listings = await fetchListings();
    const cardContent = document.getElementById('card-content');
    cardContent.innerHTML = ''; // Clear any existing content

    listings.forEach((listing) => {
      const now = new Date();
      const endTime = new Date(listing.endsAt);
      const thirtyDaysFromNow = new Date(
        now.getTime() + 30 * 24 * 60 * 60 * 1000
      );

      if (endTime > now && endTime <= thirtyDaysFromNow) {
        const cardItem = createListingCard(listing);
        cardContent.appendChild(cardItem);
      }
    });
  } catch (error) {
    console.error('Failed to load listings:', error);
  }
}

async function fetchListings() {
  const url = `${API_BASE_URL}${API_VERSION}${LISTINGS_ENDPOINT}`;
  return await get(url);
}

function createListingCard(listing) {
  // Create card item
  const cardItem = document.createElement('div');
  cardItem.className =
    'group shadow-md shadow-gray-400 rounded-xl overflow-hidden cursor-pointer';

  // Create and append image div
  cardItem.appendChild(createImageDiv(listing.media[0]));

  // Create and append content div
  cardItem.appendChild(createContentDiv(listing));

  return cardItem;
}

function createImageDiv(imageUrl) {
  // Create image div
  const imageDiv = document.createElement('div');
  imageDiv.className = 'rounded-xl overflow-hidden w-full h-full';
  // Create and append image
  const image = document.createElement('img');
  image.src = imageUrl || '/image.jpg';
  image.alt = 'Listing image';
  image.className = 'w-full h-full object-cover';
  imageDiv.appendChild(image);

  return imageDiv;
}

function createContentDiv(listing) {
  const contentDiv = document.createElement('div');
  contentDiv.className = 'p-4';

  contentDiv.appendChild(createTagSpan(listing.tags));
  contentDiv.appendChild(createTitleH3(listing.title));
  contentDiv.appendChild(createTimeLeftDiv(listing.endsAt));

  return contentDiv;
}

function createTagSpan(tags) {
  const tagSpan = document.createElement('span');
  tagSpan.className =
    'text-gray-600 py-2 px-4 font-medium bg-gray-200 rounded-xl';
  tagSpan.textContent = tags.join(', ');
  return tagSpan;
}

function createTitleH3(title) {
  const titleH3 = document.createElement('h3');
  titleH3.className = 'mt-5 font-bold text-gray-900 text-2xl';
  titleH3.textContent = title;
  return titleH3;
}

function createTimeLeftDiv(timeString) {
  const div = document.createElement('div');
  div.className = 'flex justify-between items-center mt-2';

  const p = document.createElement('p');
  p.className = 'font-semibold text-lg uppercase';
  p.textContent = 'Time left :';
  div.appendChild(p);

  const span = document.createElement('span');
  span.className =
    'text-lg rounded-xl py-1 px-2 border-red-400 bg-red-100 border-2 group-hover:bg-red-400 group-hover:text-white';
  span.textContent = formatTimeLeft(timeString);
  div.appendChild(span);

  return div;
}

function formatTimeLeft(timeString) {
  const now = new Date();
  const endTime = new Date(timeString);
  const timeDiff = endTime - now;

  if (timeDiff < 0) {
    return 'Ended';
  }

  const minutes = Math.floor(timeDiff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}min`;
  } else {
    return `${minutes}min`;
  }
}
