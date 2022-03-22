const API_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
};

export const getAllTodos = () => {
  return request('/todoss');
};

export const getUserByID = (userId: number) => {
  return request(`/users/${userId}`);
};
