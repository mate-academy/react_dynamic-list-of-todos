import { State } from '../types/State';
import { Action } from '../types/Action';

export function stateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setTodos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'setOpenedTodo':
      return {
        ...state,
        openedTodo: action.payload,
      };

    case 'setUser':
      return {
        ...state,
        user: action.payload,
      };

    case 'setFilterOption':
      return {
        ...state,
        filter: {
          ...state.filter,
          option: action.payload,
        },
      };

    case 'setFilterQuery':
      return {
        ...state,
        filter: {
          ...state.filter,
          query: action.payload,
        },
      };

    case 'setIsModalOpened':
      return {
        ...state,
        isModalOpened: action.payload,
      };

    case 'setIsLoadingTodos':
      return {
        ...state,
        isLoadingTodos: action.payload,
      };

    case 'setIsLoadingUser':
      return {
        ...state,
        isLoadingUser: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
