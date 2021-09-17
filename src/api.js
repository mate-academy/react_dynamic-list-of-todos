const BASE_URL = 'https://mate.academy/students-api';

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      return response.json();
    })
    .catch((error) => {
      throw new Error(`${error.status} - ${error.statusText}`);
    });
};

export const getTodos = () => request('/todos');
export const getUser = (id) => request(`/users/${id}`);
