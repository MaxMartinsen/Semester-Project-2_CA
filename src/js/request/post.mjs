/**
 * POST request to the specified URL with given data.
 * @param {string} url - The URL to send the POST request to.
 * @param {object} data - The data to be sent in the POST request.
 * @returns {Promise<object>} - The response data.
 */
export async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
