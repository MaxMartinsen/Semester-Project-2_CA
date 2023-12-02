import { get } from '../request/get.mjs';
import { API_BASE_URL, API_VERSION, LISTINGS_ENDPOINT } from '../api/url.mjs';

export async function loadListings() {
  try {
    // Fetch only active listings and sort by created date in descending order
    const url = `${API_BASE_URL}${API_VERSION}${LISTINGS_ENDPOINT}?_active=true&sort=created&sortOrder=desc&limit=11&offset=0`;
    const listings = await get(url);

    const cardContent = document.getElementById('card-content');
    cardContent.innerHTML = '';

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

function createListingCard(listing) {
  // Create card item
  const cardItem = document.createElement('div');
  cardItem.className =
    'flex group overflow-hidden cursor-pointer flex-col p-4 bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-400 md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700';

  // Create and append image div
  cardItem.appendChild(createImageDiv(listing.media[0]));

  // Create and append content div
  cardItem.appendChild(createContentDiv(listing));

  return cardItem;
}

function createImageDiv(imageUrl) {
  const image = document.createElement('img');
  image.src = imageUrl || '/image.jpg';
  image.alt = 'Listing image';
  image.className =
    'object-cover w-full rounded-t-lg h-96 md:w-96 lg:w-56 xl:w-72 md:rounded-none md:rounded-s-lg';

  return image;
}

function createContentDiv(listing) {
  const contentDiv = document.createElement('div');
  contentDiv.className =
    'flex flex-auto flex-col pl-0 md:pl-12 lg:pl-4 leading-normal';

  contentDiv.appendChild(createTitleH3(listing.title));
  contentDiv.appendChild(createDescriptionP(listing.description));
  contentDiv.appendChild(createTagSpan(listing.tags));
  contentDiv.appendChild(createTimeLeftDiv(listing.endsAt));

  return contentDiv;
}

function createTitleH3(title) {
  const titleH3 = document.createElement('h3');
  titleH3.className = 'mt-5 font-bold text-gray-900 text-2xl';
  titleH3.textContent = title;
  return titleH3;
}

function createDescriptionP(description) {
  const descriptionP = document.createElement('p');
  descriptionP.id = 'card-description';
  descriptionP.className =
    'mt-2 flex-auto font-normal text-gray-700 dark:text-gray-400';
  descriptionP.textContent = description;
  return descriptionP;
}

function createTagSpan(tags) {
  const tagSpan = document.createElement('span');

  if (tags && tags.length > 0) {
    tagSpan.className =
      'mt-4 w-fit text-gray-600 py-2 px-4 text-center font-medium bg-gray-200 rounded-xl';
    tagSpan.innerHTML = tags.map((tag) => `#${tag}&nbsp;`).join(' ');
  } else {
    tagSpan.style.display = 'none';
  }

  return tagSpan;
}

function createTimeLeftDiv(timeString) {
  const div = document.createElement('div');
  div.className = 'flex items-center lg:justify-between mt-4 text-gray-600';

  const p = document.createElement('p');
  p.className = 'font-semibold text-lg uppercase';
  p.textContent = 'Time left :';
  div.appendChild(p);

  const span = document.createElement('span');
  span.className =
    'text-lg ml-10 lg:ml-0 rounded-xl py-1 px-2 border-red-400 bg-red-100 border-2 group-hover:bg-red-400 group-hover:text-white';
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
