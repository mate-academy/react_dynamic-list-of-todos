const BASE_URL = 'https://mate.academy/students-api';

export const request = (url, options) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(res => {
      if (!res.ok) {
        return new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUser = (userId) => {
  return request(`/users/${userId}`);
};
