import { get, post } from '../request/request.mjs';
import { API_BASE_URL, API_VERSION, LISTINGS_ENDPOINT } from '../api/url.mjs';
import { createTagSpan, formatTimeLeft } from '../utils/utils.mjs';
import { isUserAuthenticated } from '../validation/validation.mjs';

// Global variable to store the current listing
let currentListing = null;

export async function loadSingleListing(listingId) {
  try {
    const includeSellerAndBids = isUserAuthenticated()
      ? '?_seller=true&_bids=true'
      : '';
    const url = `${API_BASE_URL}${API_VERSION}${LISTINGS_ENDPOINT}/${listingId}${includeSellerAndBids}`;
    const listing = await get(url);

    currentListing = listing;
    updateSingleListing(listing);
  } catch (error) {
    console.error('Failed to load single listing:', error);
  }
}

async function handleBidSubmission(listingId) {
  const bidInput = document.getElementById('bid-input');
  const bidAmount = Number(bidInput.value);
  const accessToken = localStorage.getItem('accessToken');

  const highestBid =
    currentListing.bids.length > 0 ? currentListing.bids[0].amount : 0;

  if (!bidAmount || bidAmount <= highestBid) {
    alert('Bid must be higher than the current highest bid.');
    return;
  }

  try {
    const bidData = { amount: bidAmount };
    await post(
      `${API_BASE_URL}${API_VERSION}/auction/listings/${listingId}/bids`,
      bidData,
      accessToken
    );

    const newBid = {
      bidderName: 'Your Name',
      amount: bidAmount,
    };
    currentListing.bids.unshift(newBid);
    updateBidList(currentListing.bids);
  } catch (error) {
    console.error('Error submitting bid:', error);
  }
}

function updateBidList(bids) {
  const bidListElement = document.getElementById('bid-list');
  bidListElement.innerHTML = '';

  bids.forEach((bid, index) => {
    const bidListItem = document.createElement('li');
    bidListItem.className =
      'w-full flex justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600';
    bidListItem.innerHTML = `<div id="bidder-name"><span id="bidder-count" class="me-1">${
      index + 1
    }:</span>${
      bid.bidderName
    }</div><div id="bidder-amount" class="text-gray-500">${
      bid.amount
    }<span class="ml-1">coins</span></div>`;
    bidListElement.appendChild(bidListItem);
  });
}

function updateSingleListing(listing) {
  // Element selection
  const singleCardContent = document.getElementById('single-card-content');
  const cardContent = document.getElementById('card-content');
  const carouselWrapper = document.getElementById('single-card-carousel');
  const titleElement = document.getElementById('single-card-title');
  const descriptionElement = document.getElementById('single-card-description');
  const prevButton = document.getElementById('single-card-media-prev');
  const nextButton = document.getElementById('single-card-media-next');
  const tagElement = document.getElementById('single-card-tag');
  const timerElement = document.getElementById('single-card-timer');
  const sellerAvatarImg = document.getElementById('seller-avatar');
  const sellerNameDiv = document.getElementById('seller-name');
  const bidButton = document.getElementById('bid-button');
  const sellerAvatarElement = document.getElementById(
    'single-card-seller-avatar'
  );
  const bidContentElement = document.getElementById('single-card-bid-content');

  // Check for missing DOM elements
  if (
    !singleCardContent ||
    !cardContent ||
    !carouselWrapper ||
    !titleElement ||
    !descriptionElement ||
    !tagElement ||
    !timerElement
  ) {
    console.error('Required DOM elements not found');
    return;
  }

  const isAuthenticated = isUserAuthenticated();
  let currentIndex = 0;

  // Update bid list for authenticated users
  if (isAuthenticated && listing.bids && listing.bids.length > 0) {
    updateBidList(listing.bids);
  }

  // Event listener for bid submission
  bidButton.addEventListener('click', () => handleBidSubmission(listing.id));
  function updateCarousel() {
    carouselWrapper.innerHTML = '';
    const mediaItems =
      listing.media && listing.media.length > 0
        ? listing.media
        : ['/Semester-Project-2_CA/image.jpg'];

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
    const showNavigation = mediaItems.length > 1;
    prevButton.style.display = showNavigation ? 'flex' : 'none';
    nextButton.style.display = showNavigation ? 'flex' : 'none';
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

  updateCarousel();

  titleElement.textContent = listing.title;
  descriptionElement.textContent = listing.description;
  const tagSpan = createTagSpan(listing.tags);
  tagElement.replaceWith(tagSpan);
  timerElement.textContent = formatTimeLeft(listing.endsAt);
  sellerAvatarImg.src =
    listing.seller.avatar || '/Semester-Project-2_CA/user.svg';
  sellerNameDiv.textContent = listing.seller.name || 'Seller Default';

  cardContent.classList.add('hidden');
  singleCardContent.classList.remove('hidden');
  singleCardContent.classList.add('grid');
  sellerAvatarElement.style.display = isAuthenticated ? 'flex' : 'none';
  bidContentElement.style.display = isAuthenticated ? 'flex' : 'none';
}
