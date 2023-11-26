/**
 * PUT request to the specified URL with given data.
 * @param {string} url - The URL to send the PUT request to.
 * @param {object} data - The data to be sent in the PUT request.
 * @param {string} accessToken - The access token for authorization.
 * @returns {Promise<object>} - The response data.
 */
export async function put(url, data, accessToken) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
