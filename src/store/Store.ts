/* eslint-disable @typescript-eslint/indent */
import { Filter, StoreState } from '../types/StoreState';
import { Todo } from '../types/Todo';

function applyFilters(state: StoreState): Todo[] {
  const searchTerm = state.filter.search.trim().toLowerCase();

  return state.allTodos
    .filter(todo => {
      return todo.title.toLowerCase().includes(searchTerm);
    })
    .filter(todo => {
      if (state.filter.status === 'active') {
        return !todo.completed;
      }

      if (state.filter.status === 'completed') {
        return todo.completed;
      }

      return true;
    });
}

export function reducer(state: StoreState, action: Filter): StoreState {
  switch (action.type) {
    case 'search':
      const newFilter = {
        ...state.filter,
        ...action.payload,
      };

      const filteredTodos = applyFilters({
        ...state,
        filter: newFilter,
      });

      return {
        ...state,
        filter: newFilter,
        todos: filteredTodos,
      };

    case 'load':
      return {
        ...state,
        inLoadTodo: action.payload,
      };

    case 'modal':
      return {
        ...state,
        inLoadModal: action.payload,
      };

    case 'init':
      return {
        ...state,
        allTodos: action.payload,
        todos: action.payload,
      };

    default:
      return { ...state };
  }
}
