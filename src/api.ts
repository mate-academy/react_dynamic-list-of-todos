const API_URL = 'https://mate.academy/students-api';

export const getTodos = () => {
  return fetch(`${API_URL}/todos`)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(Error)
    ));
};

export const getUsers = (id: number) => {
  return fetch(`${API_URL}/users/${id}`)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(Error)
    ));
};
