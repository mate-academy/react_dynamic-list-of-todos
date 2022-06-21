const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error!');
      }

      return response.json();
    });
};

export const getTodos = (): Promise<Todo[]> => {
  return request('/todos');
};

export const getUser = (userId: number) => {
  return request(`/users/${userId}`);
};
