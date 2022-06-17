/* eslint-disable @typescript-eslint/quotes */
const API_URL_TODO = `https://mate.academy/students-api/todos`;
const API_URL_USERS = `https://mate.academy/students-api/users`;

export const getTodo = () => {
  return fetch(API_URL_TODO)
    .then(response => response.json());
};

export const getUser = (id: number) => {
  return fetch(`${API_URL_USERS}/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('User Error');
      }

      return response.json();
    });
};
