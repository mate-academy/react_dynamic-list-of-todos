const usersURL = 'https://jsonplaceholder.typicode.com/users';
const todosURL = 'https://jsonplaceholder.typicode.com/todos';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const getTodos = (): Promise<Todos> => {
  return getData<Todos>(todosURL);
};

export const getUsers = (): Promise<Users> => {
  return getData<Users>(usersURL);
};
