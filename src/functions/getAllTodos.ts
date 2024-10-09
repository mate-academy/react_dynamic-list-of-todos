import { Todo } from '../types/Todo';

export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  const todos = await response.json();

  return todos;
}
