const API_URL = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const todos = await fetch(`${API_URL}/todos`);

    return await todos.json();
  } catch (error: any) {
    throw new Error(`${error.statusCode} ${error.message}`);
  }
};

export const getUser = async (userId: number): Promise<User | null > => {
  try {
    const user = await fetch(`${API_URL}/users/${userId}`);

    return await user.json();
  } catch (error) {
    return null;
  }
};
