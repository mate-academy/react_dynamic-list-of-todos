const BASE_URL = 'https://mate.academy/students-api';

export const getTasks = () => {
  return fetch(`${BASE_URL}/todos`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getUser = (userId) => {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
