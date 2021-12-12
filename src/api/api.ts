import { Todo } from '../types/Todo';
import { User } from '../types/User';

const API_URL = 'https://mate.academy/students-api/';

export function getTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}todos`)
    .then(response => response.json());
}

export async function getFilteredTodos(search: string, status: string) {
  const todos = await getTodos();
  const preparedSearch = search.toLocaleLowerCase().trim();
  const filtededTodos = todos.filter(todo => {
    const preparedTitle = todo.title.trim().toLocaleLowerCase();

    return preparedTitle.includes(preparedSearch);
  });

  switch (status) {
    case 'active':
      return filtededTodos.filter(todo => !todo.completed);

    case 'completed':
      return filtededTodos.filter(todo => todo.completed);

    default:
      return filtededTodos;
  }
}

export function getUser(userId: number): Promise<User> {
  return fetch(`${API_URL}users/${userId}`)
    .then(response => response.json());
}
