const API_URL = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  return fetch(`${API_URL}/todos`)
    .then(result => result.json());
};

export const getUser = (userId: number) => {
  return fetch(`${API_URL}/users/${userId}`)
    .then(result => result.json());
};
