/**
 * POST request to the specified URL with given data.
 * @param {string} url - The URL to send the POST request to.
 * @param {object} data - The data to be sent in the POST request.
 * @returns {Promise<object>} - The response data.
 */
export async function post(url, data, accessToken = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
