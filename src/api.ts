const API_URL = 'https://mate.academy/students-api/';

const getData = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => response.json());
};

export const getAllTodos = (): Promise<Todo[]> => getData('todos');

export const getUser = (userId: number): Promise<User> => getData(`users/${userId}`);
