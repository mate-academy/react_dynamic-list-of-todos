const API_URL = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${API_URL}/todos`);

  return res.json();
};

export const getUser = async (userId: number): Promise<User> => {
  const res = await fetch(`${API_URL}/users/${userId}`);

  return res.json();
};
