const API_URL = 'https://mate.academy/students-api';

export const loadData = async (endpoint: string) => {
  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error('Error of loading');
  }

  return response.json();
};

export const loadTodos = () => {
  return loadData('todos');
};

export const loadUser = (userId: number) => {
  return loadData(`users/${userId}`);
};
