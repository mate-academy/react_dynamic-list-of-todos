import { State } from '../types/State';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export type Action =
  { type: 'getTodos', payload: Todo[] }
  | { type: 'clickEye', item: Todo, slash: boolean }
  | { type: 'closedModal' }
  | { type: 'getUser', payload: User }
  | { type: 'search', payload: string }
  | { type: 'deletedSearch' }
  | { type: 'filter', payload: string };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'getUser':
      return {
        ...state,
        currentUser: action.payload,
      };

    case 'getTodos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'clickEye':
      return {
        ...state,
        currentTodo: action.item,
        isEyeSlash: action.slash,
      };

    case 'closedModal':
      return {
        ...state,
        currentTodo: null,
        currentUser: null,
        isEyeSlash: false,
      };

    case 'filter':
      return {
        ...state,
        filterBy: action.payload,
      };

    case 'search':
      return {
        ...state,
        query: action.payload,
      };

    case 'deletedSearch':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
}
