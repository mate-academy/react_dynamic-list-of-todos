const BASE_URL = 'https://mate.academy/students-api';

export const request = (endPoint:string) => {
  return fetch(`${BASE_URL}${endPoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server is not response ${response.status}`);
      }

      return response.json();
    });
};

export const getTodos = (): Promise<Todo[]> => request('/todos');

export const getUser = (userId: number): Promise<User> => (
  request(`/users/${userId}`)
);
