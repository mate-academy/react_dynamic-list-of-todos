import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// This function creates a promise
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  // we add some delay to see now the laoder works
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

function searchAndSort(todos: Todo[], searchedPhrase: string, status: string) {
  let filteredTodos: Todo[] = JSON.parse(JSON.stringify(todos));

  const isCompleted = status === 'completed';

  if (status === 'active' || status === 'completed') {
    filteredTodos = filteredTodos
      .filter(todo => todo.completed === isCompleted);
  }

  return filteredTodos
    .filter(todo => {
      return todo.title.toLowerCase().includes(searchedPhrase.toLowerCase());
    });
}

export const getTodos = () => get<Todo[]>('/todos');

export const geTodo = (todoId: number) => get<Todo>(`todos/${todoId}`);

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

export const getLookingForTodos = (searchedPhrase: string, status: string) => {
  return get<Todo[]>('/todos')
    .then(todos => searchAndSort(todos, searchedPhrase, status));
};
