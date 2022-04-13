/* eslint-disable no-console */

const BASE_URL = 'https://mate.academy/students-api';

const request = (endpoint: string, options?: RequestInit) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(response => {
      if (!response.ok) {
        console.error(`${response.status} - ${response.statusText}`);

        return null;
      }

      return response.json();
    });
};

const patch = (endpoint: string, data: TodoUpdateType) => (
  request(endpoint, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
);

export const getUserById = (id: number): Promise<User> => (
  request(`/users/${id}`)
);

export const getTodos = (): Promise<Todo[]> => (
  request('/todos')
);

export const updateTodo = (id: number, complete: boolean) => (
  patch(`/todos/${id}`, { complete })
);
