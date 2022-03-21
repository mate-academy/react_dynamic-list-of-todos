const API_URL = 'https://mate.academy/students-api';

const getData = (endpoint: string) => {
  return fetch(`${API_URL}${endpoint}`)
    .then(response => response.json());
};

export const getTodos = (): Promise<Todo[]> => getData('/todos');

export const getUser = (userId: number): Promise<User> => getData(`/users/${userId}`);
