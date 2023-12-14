// src/js/request/get.mjs

/**
 * GET request to the specified URL with an optional access token for authentication.
 * @param {string} url - The URL to send the GET request to.
 * @param {string} [accessToken] - The access token for authentication.
 * @returns {Promise<object>} - The response data.
 */
export async function get(url, accessToken = '') {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
