const API_URL = 'https://mate.academy/students-api/';

export const request = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = () => request('/todos');

export const getUserbyId = (userId: number) => request(`/users/${userId}`);
