export function createTagSpan(tags) {
  const tagSpan = document.createElement('span');

  if (tags && tags.length > 0) {
    tagSpan.className =
      'mt-4 w-fit text-gray-600 py-2 px-4 text-center font-medium bg-gray-200 rounded-xl';
    tagSpan.innerHTML = tags.map((tag) => `#${tag}&nbsp;`).join(' ');
  } else {
    tagSpan.style.display = 'none';
  }

  return tagSpan;
}
