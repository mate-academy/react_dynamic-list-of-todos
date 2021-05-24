const BASE_URL = 'https://mate-api.herokuapp.com';

export function request(url) {
  return fetch(url)
    .then(response => response.json())
    .then(response => response.data);
}

export const getTodos = async() => request(`${BASE_URL}/todos`);

export function getUsers(userId) {
  return request(`${BASE_URL}/users/${userId}`);
}
