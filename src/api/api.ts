const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUser = (userId: number) => {
  return request(`/users/${userId}`);
};

export const getActiveTodos = () => {
  return request('/todos?completed=false');
};

export const getCompletedTodos = () => {
  return request('/todos?completed=true');
};
