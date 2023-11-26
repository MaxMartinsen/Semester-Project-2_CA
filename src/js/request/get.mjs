// src/js/request/get.mjs
/**
 * GET request to the specified URL.
 * @param {string} url - The URL to send the GET request to.
 * @returns {Promise<object>} - The response data.
 */
export async function get(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
