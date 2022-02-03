const BASE_URL = 'https://mate.academy/students-api';

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
};

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
};

export const filterTodos = async (isCompleted: boolean): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos?completed=${isCompleted}`);

  return response.json();
};
