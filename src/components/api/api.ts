export const API_URL = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  return fetch(`${API_URL}/todos`)
    .then(result => result.json());
};

export const getUser = async (userId: number): Promise<User> => {
  return fetch(`${API_URL}/users/${userId}`)
    .then(result => result.json());
};
