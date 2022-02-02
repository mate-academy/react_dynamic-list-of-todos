export const getTodos = async () => {
  const url = 'https://mate.academy/students-api/todos';
  const todos = await fetch(url);

  return todos.json();
};

export const getUsers = async (id: number) => {
  const url = `https://mate.academy/students-api/users/${id}`;
  const users = await fetch(url);

  return users.json();
};
