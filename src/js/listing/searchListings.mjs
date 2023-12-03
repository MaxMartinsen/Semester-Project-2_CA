import { loadListings } from './loadListings.mjs';

function searchListings() {
  const searchInput = document.getElementById('search-navbar');
  const searchTerm = searchInput.value;
  loadListings(searchTerm, true);
  searchInput.value = '';
}

export function initializeSearch() {
  const searchButton = document.getElementById('navbar-search-button');
  searchButton.addEventListener('click', searchListings);
}
