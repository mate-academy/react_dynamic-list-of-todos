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

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

export const getCompletedTodos = () => {
  return getTodos()
    .then(todos => todos.filter(todo => todo.completed));
};

export const getActiveTodos = () => {
  return getTodos()
    .then(todos => todos.filter(todo => !todo.completed));
};

export const getSearchedTodos = (searchedLetters: string) => {
  const input = searchedLetters.trim().toLowerCase();

  return getTodos()
    .then(todos => todos
      .filter(todo => todo.title.toLowerCase().includes(input)));
};

export const selectTodo = (todoId: number) => {
  getTodos().then(todos => todos.find(todo => todo.id === todoId) || null);
};
