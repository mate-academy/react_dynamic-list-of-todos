export const getTodos = async (): Promise<Todo[]> => {
  const url = 'https://mate.academy/students-api/todos';

  return fetch(url).then(response => response.json());
};

export const getUser = async (userId: number): Promise<User> => {
  const url = `https://mate.academy/students-api/users/${userId}`;

  return fetch(url).then(response => response.json());
};

export const filterTodos = async (completed: boolean): Promise<Todo[]> => {
  const url = `https://mate.academy/students-api/todos?completed=${completed}`;

  return fetch(url).then(response => response.json());
};
