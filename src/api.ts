// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiUrl = 'https://mate.academy/students-api/';

const getData = (url: string) => {
  return fetch(apiUrl + url)
    .then(res => res.json());
};

export const getTodos = (): Promise<Todo[]> => getData('todos');

export const getUser = (userId: number): Promise<User> => getData(`users/${userId}`);
