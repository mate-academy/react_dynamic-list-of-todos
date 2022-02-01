const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        return new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUsers = (userId: number) => {
  return request(`/users/${userId}`);
};
