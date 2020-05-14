const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTodos = async (): Promise<TodoFromServer[]> => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);

  return response.json();
};

export const getPreparedTodos = async (): Promise<Todo[]> => {
  const [todos, users] = await Promise.all([getTodos(), getUsers()]);

  return todos.map(todo => ({
    ...todo,
    user: users.find(currentUser => todo.userId === currentUser.id) as User,
  }));
};
