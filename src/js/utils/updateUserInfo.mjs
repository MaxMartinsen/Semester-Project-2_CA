export function updateUserInfo() {
  const userNameElement = document.getElementById('user-name');
  const userEmailElement = document.getElementById('user-email');
  const userCreditsElement = document.getElementById('user-credits');

  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const credits = localStorage.getItem('credits');

  if (userNameElement && name) {
    userNameElement.textContent = name;
  }
  if (userEmailElement && email) {
    userEmailElement.textContent = email;
  }
  if (userCreditsElement && credits) {
    userCreditsElement.textContent = ` ${credits}`;
  }
}
