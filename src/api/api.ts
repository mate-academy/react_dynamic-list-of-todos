const API_URL = ' https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUserById = (id: number) => {
  return request(`/users/${id}`);
};
