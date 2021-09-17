const BASE_URL = 'https://mate.academy/students-api';

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error());
    });
};

export const getTodos = () => request('/todos');
export const getUser = (id) => request(`/users/${id}`);
