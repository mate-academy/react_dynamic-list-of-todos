// eslint-disable-next-line
// const API_URL = `https://mate-api.herokuapp.com`;

// export function getAllTodos() {
//   return fetch(`${API_URL}/todos`)
//     .then(confirmFetch);
// }

// export function getUser(userId) {
//   return fetch(`${API_URL}/users/${userId}`)
//     .then(confirmFetch);
// }

// function confirmFetch(response) {
//   if (!response.ok) {
//     throw new Error(`${response.status} - ${response.statusText}`);
//   }

//   return response.json();
// }

const BASE_URL = 'https://mate-api.herokuapp.com';

const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    return res.json();
  });

export const getAllTodos = () => request('/todos');

export const getUser = id => request(`/users/${id}`);
