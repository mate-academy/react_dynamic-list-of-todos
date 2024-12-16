import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoStatus } from './types/TodoStatus';

// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

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

  // we add some delay to see how the loader works
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getTodos = () => get<Todo[]>('/todos');

export const getSortedTodos = () => {
  return getTodos().then(todos => todos.sort((a, b) => a.id - b.id));
};

export const getCompletedTodos = () => {
  return getSortedTodos()
    .then(todos => todos.filter(
      todo => todo.completed === true
    )
  );
};

export const getActiveTodos = () => {
  return getSortedTodos()
    .then(todos => todos.filter(
      todo => todo.completed === false
    )
  );
};

export const getFilteredTodos = (value: TodoStatus) => {
  switch (value) {
    case TodoStatus.all:
      return getSortedTodos();

    case TodoStatus.active:
      return getActiveTodos();

    case TodoStatus.completed:
      return getCompletedTodos();

    default:
      return getSortedTodos();
  }
};

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
