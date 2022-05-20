const API__URL = 'https://mate.academy/students-api';

export const getUsers = async (id: number) => {
  const response = await fetch(`${API__URL}/users/${id}`);

  return response.json();
}
