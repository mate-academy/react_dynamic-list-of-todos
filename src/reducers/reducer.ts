import { State } from '../types/State';
import { Action, ActionType } from '../types/Action';

export function stateReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.setTodos:
      return {
        ...state,
        todos: action.payload,
      };

    case ActionType.setOpenedTodo:
      return {
        ...state,
        openedTodo: action.payload,
      };

    case ActionType.setUser:
      return {
        ...state,
        user: action.payload,
      };

    case ActionType.setFilterOption:
      return {
        ...state,
        filter: {
          ...state.filter,
          option: action.payload,
        },
      };

    case ActionType.setFilterQuery:
      return {
        ...state,
        filter: {
          ...state.filter,
          query: action.payload,
        },
      };

    case ActionType.setIsModalOpened:
      return {
        ...state,
        isModalOpened: action.payload,
      };

    case ActionType.setIsLoadingTodos:
      return {
        ...state,
        isLoadingTodos: action.payload,
      };

    case ActionType.setIsLoadingUser:
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
