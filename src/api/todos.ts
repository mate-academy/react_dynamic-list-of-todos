// eslint-disable-next-line
const API_URL = `https://mate.academy/students-api/todos`;

export function getAllTodos(): Promise<Todo[]> {
  return fetch(API_URL)
    .then(response => response.json());
}
