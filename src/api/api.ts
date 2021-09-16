const API_URL = 'https://mate.academy/students-api/';

export const loadData = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => {
      return response.ok
        ? response.json()
        : Promise.reject(new Error('Failed to load data'));
    });
};

export const loadTodos = () => loadData('/todos');
export const loadUsers = (userId: number) => loadData(`/users/${userId}`);
