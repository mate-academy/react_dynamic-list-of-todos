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

export enum ActionTypes {
  SetInitialTodos,
  SetTodos,
  SetLoading,
  SetSearchQuery,
  SetFilter,
  SetCurrentTodo,
}

export type Action =
  { type: ActionTypes.SetInitialTodos, payload: Todo[] }
  |
  { type: ActionTypes.SetTodos, payload: Todo[] }
  |
  { type: ActionTypes.SetLoading, payload: boolean }
  |
  { type: ActionTypes.SetSearchQuery, payload: string }
  |
  { type: ActionTypes.SetFilter, payload: Filter }
  |
  { type: ActionTypes.SetCurrentTodo, payload: Todo | null };

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
    case ActionTypes.SetInitialTodos:
      return {
        ...state,
        initialTodos: action.payload,
        todos: action.payload,
      };

    case ActionTypes.SetTodos:
      return { ...state, todos: action.payload };

    case ActionTypes.SetLoading:
      return { ...state, isLoading: action.payload };

    case ActionTypes.SetSearchQuery:
      return {
        ...state,
        searchQuery: action.payload,
        todos: prepareTodos({ ...state, searchQuery: action.payload }),
      };

    case ActionTypes.SetFilter:
      return {
        ...state,
        filter: action.payload,
        todos: prepareTodos({ ...state, filter: action.payload }),
      };

    case ActionTypes.SetCurrentTodo:
      return { ...state, currentTodo: action.payload };

    default:
      return state;
  }
};
