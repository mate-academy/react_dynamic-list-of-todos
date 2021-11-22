const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server is not response ${response.status}`);
      }

      return response.json();
    });
};

export const getTodos = (): Promise<Todo[]> => request('/todos');
export const getUserById = (userId: number): Promise<User> => (
  request(`/users/${userId}`)
);
