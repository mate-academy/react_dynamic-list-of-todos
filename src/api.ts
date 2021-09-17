const API_URL = 'https://mate.academy/students-api';

export const loadTodos = async () => {
  const respone = await fetch(`${API_URL}/todos`);

  return respone.json();
};

export const loadUser = async (userId: number) => {
  const respone = await fetch(`${API_URL}/users/${userId}`);

  return respone.json();
};
