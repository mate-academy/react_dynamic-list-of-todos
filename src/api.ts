const API_URL = 'https://mate.academy/students-api';

export const loadTodos = () => {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
};

export const loadUsers = async (userId: number) => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
};
