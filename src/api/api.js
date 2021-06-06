const API_URL = 'https://mate-api.herokuapp.com';

function getData(url) {
  return fetch(`${API_URL}${url}`)
    .then(response => response.json())
    .then(response => response.data);
}

export function getTodos() {
  return getData('/todos');
}

export function getUser(userId) {
  return getData(`/users/${userId}`);
}
