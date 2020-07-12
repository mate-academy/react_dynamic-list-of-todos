const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getDataFromServer = async (url: string) => {
  const response = await fetch(url);

  return response.json();
};

export const getTodosData = async (): Promise<[Todo[], User[]]> => {
  const data = await Promise.all([
    getDataFromServer(TODOS_URL),
    getDataFromServer(USERS_URL),
  ]);

  return data;
};
