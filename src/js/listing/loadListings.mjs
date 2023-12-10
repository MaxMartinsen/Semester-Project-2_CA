import { get } from '../request/get.mjs';
import { API_BASE_URL, API_VERSION, LISTINGS_ENDPOINT } from '../api/url.mjs';
import { loadSingleListing } from './listing.mjs';
import { createTagSpan, formatTimeLeft } from '../utils/utils.mjs';

let currentListings = [];

export async function loadListings(searchTerm = '', isSearch = false) {
  try {
    let url = `${API_BASE_URL}${API_VERSION}${LISTINGS_ENDPOINT}?_active=true`;

    const limit = isSearch ? 60 : 12;
    url += `&sort=created&sortOrder=desc&limit=${limit}&offset=0`;

    console.log('Fetching URL:', url); // Debugging

    let listings = await get(url);

    console.log('Listings fetched:', listings.length); // Debugging

    if (isSearch && searchTerm) {
      listings = listings.filter(
        (listing) =>
          (listing.title &&
            listing.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (listing.description &&
            listing.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      console.log('Listings after filter:', listings.length); // Debugging
    }

    const newListingIds = listings.map((listing) => listing.id);
    const currentListingIds = currentListings.map((listing) => listing.id);

    if (!arraysEqual(newListingIds, currentListingIds)) {
      updateListingsDOM(listings);
      currentListings = listings;
    }
  } catch (error) {
    console.error('Failed to load listings:', error);
  }
}

function updateListingsDOM(listings) {
  const cardContent = document.getElementById('card-content');
  cardContent.innerHTML = '';
  listings.forEach((listing) => {
    const cardItem = createListingCard(listing);
    cardContent.appendChild(cardItem);
  });
}

function arraysEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

function createListingCard(listing) {
  // Create card item
  const cardItem = document.createElement('div');
  cardItem.className =
    'flex group overflow-hidden cursor-pointer flex-col p-4 bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-400 md:flex-row hover:bg-gray-100';

  // Create and append image div
  cardItem.appendChild(createImageDiv(listing.media[0]));

  // Create and append content div
  cardItem.appendChild(createContentDiv(listing));
  cardItem.addEventListener('click', () => {
    loadSingleListing(listing.id);
  });

  return cardItem;
}

function createImageDiv(imageUrl) {
  const image = document.createElement('img');
  image.src = imageUrl || '/Semester-Project-2_CA/image.jpg';
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
  descriptionP.className = 'mt-2 flex-auto font-normal text-gray-700';
  descriptionP.textContent = description;
  return descriptionP;
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
