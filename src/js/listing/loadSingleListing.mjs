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

  if (!bidAmount) {
    alert('Please enter a bid amount.');
    return;
  }

  const highestBid =
    currentListing.bids && currentListing.bids.length > 0
      ? currentListing.bids[0].amount
      : 0;
  if (bidAmount <= highestBid) {
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

    // Update bid list
    const newBid = { bidderName: 'Your Bid', amount: bidAmount };
    currentListing.bids.unshift(newBid);
    updateBidList(currentListing.bids);
  } catch (error) {
    console.error('Error submitting bid:', error);
  }
}

function sortBidsDescending(bids) {
  return bids.sort((a, b) => b.amount - a.amount);
}

function updateBidList(bids) {
  let bidListElement = document.getElementById('bid-list');

  // Create bid list element if it doesn't exist
  if (!bidListElement) {
    bidListElement = document.createElement('ul');
    bidListElement.id = 'bid-list';
    const bidContentElement = document.getElementById(
      'single-card-bid-content'
    );
    bidContentElement.appendChild(bidListElement);
  }

  bidListElement.innerHTML = '';

  bids.forEach((bid, index) => {
    const bidListItem = document.createElement('li');
    bidListItem.className =
      'w-full flex justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg';
    bidListItem.innerHTML = `<div id="bidder-name"><span id="bidder-count" class="me-1">${
      bids.length - index
    }:</span>${
      bid.bidderName
    }</div><div id="bidder-amount" class="text-gray-500">${
      bid.amount
    }<span class="ml-1">coins</span></div>`;
    bidListElement.appendChild(bidListItem);
  });

  // Ensure bid list is visible
  bidListElement.style.display = '';
}

function updateSingleListing(listing) {
  const currentUserName = localStorage.getItem('name');
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
  const bidFormElement = document.getElementById('bid-form');
  const sellerAvatarElement = document.getElementById(
    'single-card-seller-avatar'
  );
  const bidContentElement = document.getElementById('single-card-bid-content');
  const titleH1Element = document.getElementById('h1-title');
  const tabButton = document.getElementById('tab-button');
  let bidListElement = document.getElementById('bid-list');

  // Ensure bid list element exists
  if (!bidListElement && bidContentElement) {
    bidListElement = document.createElement('ul');
    bidListElement.id = 'bid-list';
    bidContentElement.appendChild(bidListElement);
  }

  // Update the h1 title to "Auction"
  if (titleH1Element) {
    titleH1Element.textContent = 'Auction';
  }

  // Add event listener for the Back button
  if (tabButton) {
    tabButton.textContent = 'Back';
    tabButton.addEventListener('click', () => {
      window.location.href = 'Semester-Project-2_CA/';
    });
  }

  // Check for required DOM elements
  if (
    !singleCardContent ||
    !cardContent ||
    !carouselWrapper ||
    !titleElement ||
    !descriptionElement ||
    !tagElement ||
    !timerElement ||
    !sellerAvatarImg ||
    !sellerNameDiv ||
    !bidButton ||
    !sellerAvatarElement ||
    !bidContentElement
  ) {
    console.error('Required DOM elements not found');
    return;
  }

  let currentIndex = 0;

  // Update carousel
  function updateCarousel() {
    carouselWrapper.innerHTML = '';
    const mediaItems =
      listing.media && listing.media.length > 0
        ? listing.media
        : ['/Semester-Project-2_CA/image.jpg'];

    mediaItems.forEach((imageUrl, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = `carousel-item duration-200 ease-linear ${
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

  // Attach event listeners for carousel navigation
  prevButton.addEventListener('click', showPrevImage);
  nextButton.addEventListener('click', showNextImage);

  // Initialize carousel
  updateCarousel();

  // Update other elements
  titleElement.textContent = listing.title;
  descriptionElement.textContent = listing.description;
  tagElement.replaceWith(createTagSpan(listing.tags));
  timerElement.textContent = formatTimeLeft(listing.endsAt);

  // Handle seller and bid section visibility
  const isAuthenticated = isUserAuthenticated();
  const isOwnListing =
    isAuthenticated &&
    listing.seller &&
    listing.seller.name === currentUserName;

  if (isAuthenticated) {
    if (isOwnListing) {
      // Hide bid form, but show bid list for the user's own listing
      if (bidFormElement) bidFormElement.style.visibility = 'hidden';
      if (listing.bids && listing.bids.length > 0) {
        updateBidList(sortBidsDescending(listing.bids));
        bidListElement.style.display = '';
      } else {
        bidListElement.style.display = 'none';
      }
    } else {
      // Show both bid form and bid list for listings not owned by the user
      if (bidFormElement) bidFormElement.style.display = 'flex';
      bidButton.addEventListener('click', () =>
        handleBidSubmission(listing.id)
      );
      if (listing.bids && listing.bids.length > 0) {
        updateBidList(sortBidsDescending(listing.bids));
        bidListElement.style.display = '';
      } else {
        bidListElement.style.display = 'none';
      }
    }
  } else {
    // Hide both bid form and bid list for non-authenticated users
    if (bidFormElement) bidFormElement.style.display = 'none';
    bidListElement.style.display = 'none';
  }

  if (isAuthenticated && listing.seller) {
    sellerAvatarImg.src =
      listing.seller.avatar || '/Semester-Project-2_CA/user.svg';
    sellerNameDiv.textContent = listing.seller.name || 'Seller Default';
  }

  // Hide or show seller avatar and bid form based on whether it's the user's own listing
  sellerAvatarElement.style.visibility = isOwnListing ? 'hidden' : 'flex';

  if (isAuthenticated) {
    if (listing.bids && listing.bids.length > 0) {
      updateBidList(sortBidsDescending(listing.bids));
      bidListElement.style.display = '';
    } else {
      bidListElement.style.display = 'none';
    }
  } else {
    bidListElement.style.display = 'none';
  }

  // Update layout
  cardContent.classList.add('hidden');
  singleCardContent.classList.remove('hidden');
  singleCardContent.classList.add('grid');
}
