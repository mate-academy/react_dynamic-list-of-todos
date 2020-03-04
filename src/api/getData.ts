async function getData <T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getTodos = (): Promise<Todo[]> => {
  return getData('https://jsonplaceholder.typicode.com/todos');
};

export const getUsers = (): Promise<User[]> => {
  return getData('https://jsonplaceholder.typicode.com/users');
};
