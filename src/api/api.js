const API_URL = 'https://mate-api.herokuapp.com';

function request(url) {
  return fetch(`${API_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} --- ${response.statusText}`);
      }

      return response.json();
    })
    .then(json => json.data);
}

export function getTodos() {
  return request('/todos');
}

export function getUsers() {
  return request('/users');
}

export function getUserById(id) {
  return request(`/users/${id}`);
}
