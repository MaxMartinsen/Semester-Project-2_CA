export function initializeTagify() {
  var input = document.querySelector('input[name=tags]');

  if (input) {
    /* global Tagify */
    new Tagify(input);
  }
}
