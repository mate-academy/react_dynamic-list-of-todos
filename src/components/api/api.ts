export const API_URL = 'https://mate.academy/students-api';

export const loadTodos = () => {
  return fetch(`${API_URL}/todos`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const loadUser = (userId: number) => {
  return fetch(`${API_URL}/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
