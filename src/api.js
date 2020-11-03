const BASE_URL = 'https://mate-api.herokuapp.com';

function request(url) {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(result => result.data);
}

export function getTodos() {
  return request(`/todos`);
}

export function getUser(userId) {
  return request(`/users/${userId}`);
}
