const USER_API_URL = 'https://jsonplaceholder.typicode.com/users';
const TODO_API_URL = 'https://jsonplaceholder.typicode.com/todos';


const getData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const getUsers = async (): Promise<Users> => {
  return getData(USER_API_URL);
};

const getTodos = async (): Promise<Todos> => {
  return getData(TODO_API_URL);
};

export const getPreparedTodos = async (): Promise<PreparedTodos> => {
  const users = await getUsers();
  const todos = await getTodos();

  return todos.map((todo) => ({
    ...todo,
    users: users.find((user) => user.id === todo.userId) as User,
  }));

};
