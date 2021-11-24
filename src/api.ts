const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .catch(error => {
      throw new Error(`${error.status} - ${error.message}`);
    });
};

export const getAllTodos = () => {
  return request('/todos');
};

export const getAllUsers = () => {
  return request('/users');
};

export const getUser = (userId: number) => {
  return request(`/users/${userId}`);
};
