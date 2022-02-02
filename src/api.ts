export const request = async <T>(endpoint: string): Promise<T> => {
  const url = `https://mate.academy/students-api/${endpoint}`;

  try {
    const response = await fetch(url);
    const data: T = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    throw error;
  }
};

export const getTodos = async (isCompleted: boolean | undefined = undefined): Promise<Todo[]> => {
  let endpoint = 'todos';

  if (isCompleted !== undefined) {
    endpoint += `?completed=${isCompleted}`;
  }

  const todos: Todo[] = await request(endpoint);

  return todos;
};

export const getUser = async (userId: number): Promise<User> => {
  const endpoint = `users/${userId}`;

  const user: User = await request(endpoint);

  return user;
};
