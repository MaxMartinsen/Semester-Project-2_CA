// src/js/loadListings.mjs
import { get } from '../request/get.mjs';
import { API_BASE_URL, API_VERSION, LISTINGS_ENDPOINT } from '../api/url.mjs';

export async function loadListings() {
  try {
    const url = `${API_BASE_URL}${API_VERSION}${LISTINGS_ENDPOINT}`;
    const listings = await get(url);

    const cardContent = document.getElementById('card-content');
    cardContent.innerHTML = ''; // Clear any existing content

    listings.forEach((listing) => {
      // Create card item div
      const cardItem = document.createElement('div');
      cardItem.className =
        'card-item group shadow-md shadow-gray-400 rounded-xl overflow-hidden cursor-pointer';

      // Create image div
      const imageDiv = document.createElement('div');
      imageDiv.className = 'rounded-xl overflow-hidden';
      const image = document.createElement('img');
      image.src = listing.media[0] || '/image.jpg';
      image.alt = 'Listing image';
      image.className = 'max-w-full w-full h-auto';
      imageDiv.appendChild(image);

      // Create content div
      const contentDiv = document.createElement('div');
      contentDiv.className = 'p-4';

      // Create and append tag span
      const tagSpan = document.createElement('span');
      tagSpan.className =
        'text-gray-600 py-2 px-4 font-medium bg-gray-200 rounded-xl';
      tagSpan.textContent = listing.tags.join(', '); // Assuming tags is an array
      contentDiv.appendChild(tagSpan);

      // Create and append title h3
      const titleH3 = document.createElement('h3');
      titleH3.className = 'mt-5 font-bold text-gray-900 text-2xl';
      titleH3.textContent = listing.title;
      contentDiv.appendChild(titleH3);

      // Time left div
      const timeLeftDiv = document.createElement('div');
      timeLeftDiv.className = 'flex justify-between items-center mt-2';
      const timeLeftP = document.createElement('p');
      timeLeftP.className = 'font-semibold text-lg uppercase';
      timeLeftP.textContent = 'Time left :';
      const timeLeftSpan = document.createElement('span');
      timeLeftSpan.className =
        'text-lg rounded-xl py-1 px-2 border-red-400 bg-red-100 border-2 group-hover:bg-red-400 group-hover:text-white';
      timeLeftSpan.textContent = formatTimeLeft(listing.endsAt); // You need to implement formatTimeLeft to format the time
      timeLeftDiv.appendChild(timeLeftP);
      timeLeftDiv.appendChild(timeLeftSpan);

      // Append content to card item
      contentDiv.appendChild(timeLeftDiv);
      cardItem.appendChild(imageDiv);
      cardItem.appendChild(contentDiv);

      // Append card item to card content
      cardContent.appendChild(cardItem);
    });
  } catch (error) {
    console.error('Failed to load listings:', error);
    // Handle error, such as displaying a message to the user
  }
}

function formatTimeLeft(timeString) {
  // Implement time formatting logic here
  // Convert ISO timeString to a more human-readable format
  return timeString; // Placeholder
}
