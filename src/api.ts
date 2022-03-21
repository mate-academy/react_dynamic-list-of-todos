// eslint-disable-next-line
const API_URL = `https://mate.academy/students-api`;

export const getTodos = () => {
  return fetch(`${API_URL}/todos`)
    .then(respons => respons.json());
};

export const getUsers = (id: number): Promise<User> => {
  return fetch(`${API_URL}/users/${id}`)
    .then(respons => respons.json());
};
