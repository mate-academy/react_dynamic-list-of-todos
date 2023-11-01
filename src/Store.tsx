import React, { useEffect, useReducer } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { getTodos } from './api';

type Action =
| { type: 'loadTodos', payload: Todo[] }
| { type: 'setTodoModal', payload: Todo | null }
| { type: 'toggleLoadingTodos' }
| { type: 'filterAndSearchTodos'; filter: Filter; search: string };

interface State {
  todos: Todo[];
  filteredTodos: Todo[];
  loadingTodos: boolean;
  todoModal: Todo | null;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'loadTodos':
      return {
        ...state,
        todos: action.payload,
        filteredTodos: action.payload,
      };

    case 'setTodoModal':
      return {
        ...state,
        todoModal: action.payload,
      };

    case 'toggleLoadingTodos':
      return {
        ...state,
        loadingTodos: !state.loadingTodos,
      };

    case 'filterAndSearchTodos': {
      let filterAndSearchTodos = [...state.todos];

      filterAndSearchTodos = filterAndSearchTodos.filter(todo => {
        switch (action.filter) {
          case Filter.Active:
            return !todo.completed;

          case Filter.Completed:
            return todo.completed;

          case Filter.All:
          default:
            return true;
        }
      });

      if (action.search) {
        filterAndSearchTodos = filterAndSearchTodos.filter(todo => {
          return todo.title
            .toLocaleLowerCase().includes(action.search.trim().toLowerCase());
        });
      }

      return {
        ...state,
        filteredTodos: filterAndSearchTodos,
      };
    }

    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  filteredTodos: [],
  loadingTodos: false,
  todoModal: null,
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line max-len
export const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'toggleLoadingTodos' });
    getTodos()
      .then(todos => dispatch({ type: 'loadTodos', payload: todos }))
      .finally(() => dispatch({ type: 'toggleLoadingTodos' }));
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
