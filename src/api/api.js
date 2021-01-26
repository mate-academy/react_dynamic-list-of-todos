// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com`;

export function getAllTodos() {
  return fetch(`${API_URL}/todos`)
    .then(confirmFetch);
}

export function getUser(userId) {
  return fetch(`${API_URL}/users/${userId}`)
    .then(confirmFetch);
}

function confirmFetch(response) {
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}
