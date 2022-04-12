const API_URL_TODOS = 'https://mate.academy/students-api/todos';

export function getTodos(): Promise<Todo[]> {
  return fetch(API_URL_TODOS)
    .then(response => response.json());
}

export const getUser = (userId: number): Promise<User> => {
  return fetch(`https://mate.academy/students-api/users/${userId}`)
    .then(response => response.json());
};
