import { User } from './Types/User';
import { Todo } from './Types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

function fetchData(url: string) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
}

export function fetchTodos(): Promise<Todo[]> {
  return fetchData('/todos');
}

export function fetchUserById(id:number): Promise<User> {
  return fetchData(`/users/${id}`);
}
