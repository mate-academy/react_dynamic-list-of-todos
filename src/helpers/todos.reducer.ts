import { FILTER, Filter } from '../constants/filter';
import { Todo } from '../types/Todo';

export type State = {
  initialTodos: Todo[],
  todos: Todo[],
  isLoading: boolean,
  searchQuery: string,
  filter: Filter,
  currentTodo: Todo | null
};

export type Action =
  { type: 'setInitialTodos', payload: Todo[] }
  |
  { type: 'setTodos', payload: Todo[] }
  |
  { type: 'setLoading', payload: boolean }
  |
  { type: 'setSearchQuery', payload: string }
  |
  { type: 'setFilter', payload: Filter }
  |
  { type: 'setCurrentTodo', payload: Todo | null };

export const prepareTodos = ({
  initialTodos, searchQuery, filter,
}: State): Todo[] => {
  let todos = [...initialTodos];
  const query = searchQuery.trim().toLocaleLowerCase();

  if (query) {
    todos = todos.filter(({ title }) => title.toLowerCase().includes(query));
  }

  switch (filter) {
    case FILTER.completed:

      return todos.filter(({ completed }) => completed);

    case FILTER.active:
      return todos.filter(({ completed }) => !completed);

    default:
      return todos;
  }
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setInitialTodos':
      return {
        ...state,
        initialTodos: action.payload,
        todos: action.payload,
      };

    case 'setTodos':
      return { ...state, todos: action.payload };

    case 'setLoading':
      return { ...state, isLoading: action.payload };

    case 'setSearchQuery':
      return {
        ...state,
        searchQuery: action.payload,
        todos: prepareTodos({ ...state, searchQuery: action.payload }),
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
        todos: prepareTodos({ ...state, filter: action.payload }),
      };

    case 'setCurrentTodo':
      return { ...state, currentTodo: action.payload };

    default:
      return state;
  }
};
