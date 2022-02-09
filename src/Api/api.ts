const BASE_URL = 'https://mate.academy/students-api';

export async function getAllTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(`${BASE_URL}/todos`);

    return await response.json();
  } catch (error) {
    throw new Error('Error');
  }
}

export const getUser = async (userId: number) => {
  const user = await fetch(`${BASE_URL}/users/${userId}`);

  return user.json();
};
