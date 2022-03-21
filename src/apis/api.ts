const API_URL = 'https://mate.academy/students-api';

const getData = (endpoint: string): Promise<Todo[]> => {
  return fetch(`${API_URL}${endpoint}`)
    .then(response => response.json());
};

export const getTodos = () => getData('/todos');

export const getUser = (userId: number): Promise<User> => {
  return fetch(`${API_URL}/users/${userId}`)
    .then(response => response.json());
};
