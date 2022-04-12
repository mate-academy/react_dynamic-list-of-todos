const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};

export const getTodo = (params = '') => request(`/todos?${params}`);

export const getUserById = (id: number) => request(`/users/${id}/`);
