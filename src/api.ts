export const API_URL = 'https://mate.academy/students-api';

export const loadTodos = (limit = 1000) => {
  return fetch(`${API_URL}/todos?limit=${limit}`)
    .then(respons => respons.json());
};

export const loadTodosAsync = async (limit = 200) => {
  const respons = await fetch(`${API_URL}/todos?limit=${limit}`);

  return respons.json();
};

export const loadUserAsync = async (userId: number) => {
  const respons = await fetch(`${API_URL}/users/${userId}`);

  return respons.json();
};
