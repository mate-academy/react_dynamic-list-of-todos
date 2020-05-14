const URL = 'https://jsonplaceholder.typicode.com';

const getData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const getUsers = async (): Promise<Users> => {
  return getData(`${URL}/users`);
};

const getTodos = async (): Promise<Todos> => {
  return getData(`${URL}/todos`);
};

export const getPreparedTodos = async (): Promise<PreparedTodos> => {
  const users = await getUsers();
  const todos = await getTodos();

  return todos.map((todo) => ({
    ...todo,
    users: users.find((user) => user.id === todo.userId) as User,
  }));
};
