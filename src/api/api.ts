const API_URL = 'https://mate.academy/students-api/';

export const loadData = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => response.json());
};

export const loadTodos = () => loadData('/todos');
export const loadUsers = (userId: number) => loadData(`/users/${userId}`);
