const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getUsers = () => {
  return getData<User[]>(`${BASE_URL}/users`);
};

export const getTodos = () => {
  return getData<Todo[]>(`${BASE_URL}/todos`);
};