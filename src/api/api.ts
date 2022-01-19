const BASE_URL = 'https://mate.academy/students-api';

const getData = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};

export const getTodos = (): Promise<Todo[]> => getData('/todos');
export const getUsers = (userId: number): Promise<User> => getData(`/users/${userId}`);
