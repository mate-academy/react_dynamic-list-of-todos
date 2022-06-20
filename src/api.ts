const API = 'https://mate.academy/students-api';

export const getTodos = (): Promise<Todo[]> => {
  return fetch(`${API}/todos`)
    .then(response => response.json());
};

export const getUser = (): Promise<User[]> => {
  return fetch(`${API}/users`)
    .then(response => response.json());
};
