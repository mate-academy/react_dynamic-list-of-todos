const BASE_URL = 'https://mate-api.herokuapp.com';

/* eslint-disable */
const request = (url, options) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUsers = (id) => {
  return request(`/users/${id}`);
};
/* eslint-enable */
