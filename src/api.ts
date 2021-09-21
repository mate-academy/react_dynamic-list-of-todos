const URL_API = 'https://mate.academy/students-api';

export const loadTodos = async () => {
  const response = await fetch(`${URL_API}/todos?limit=200`);

  return response.json();
};

export const loadUser = async (userId: number) => {
  const response = await fetch(`${URL_API}/users/${userId}`);

  return response.json();
};
