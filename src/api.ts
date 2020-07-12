const API_URL = 'https://jsonplaceholder.typicode.com';

const todos = (): Promise<Todos> => {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
};

const users = (): Promise<Users > => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json());
};

export const getTodos = async (): Promise<GetTodos> => {
  const [todosData, usersData] = await Promise.all([todos(), users()]);

  return todosData.map((todo) => ({
    ...todo,
    user: usersData.find((user) => user.id === todo.userId) as User,
  }));
};
