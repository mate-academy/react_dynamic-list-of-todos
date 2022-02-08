const API_URL = 'https://mate.academy/students-api/todos';

export async function getAllTodo(): Promise<Todo[]> {
  const response = await fetch(API_URL);

  return response.json();
}

const API_URL1 = 'https://mate.academy/students-api/users/';

export const currentUser = async (userId: number) => {
  const response = await fetch(`${API_URL1}${userId}`);

  return response.json();
};
