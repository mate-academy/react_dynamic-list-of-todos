import { Todo } from './types/Todo';
import { User } from './types/User';
import { Filter } from './types/Filter';

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

  // we add some delay to see how the laoder works
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

export const filterTodo = (
  todos: Todo[],
  filterParam: Filter,
  queryParam: string,
) => {
  let todosCopy = [...todos];

  switch (filterParam) {
    case Filter.Active:
      todosCopy = todosCopy.filter(todo => !todo.completed);
      break;
    case Filter.Completed:
      todosCopy = todosCopy.filter(todo => todo.completed);
      break;
    case Filter.All:
    default:
      break;
  }

  if (queryParam) {
    todosCopy = todosCopy.filter(todo => {
      const lowerQueryParam = queryParam.toLowerCase();
      const lowerTitle = todo.title.toLowerCase();

      return lowerTitle.includes(lowerQueryParam);
    });
  }

  return todosCopy;
};
