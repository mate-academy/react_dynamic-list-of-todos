import React, { useEffect, useReducer } from 'react';
import { Todo } from './types/Todo';

type Action =
  | { type: 'loadTodos'; todos: Todo[] }
  | { type: 'changeFilterValue'; filterValue: string }
  | { type: 'setTodoInPopup'; id: number }
  | { type: 'resetPopupTodo' }
  | { type: 'setSeqrchQuery'; searchQuery: string };

export enum FilterValue {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

interface State {
  todos: Todo[];
  todoInPopup: Todo | null;
  filterValue: string;
  searchQuery: string;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'loadTodos':
      return { ...state, todos: action.todos };
    case 'changeFilterValue':
      return { ...state, filterValue: action.filterValue };
    case 'setTodoInPopup':
      return {
        ...state,
        todoInPopup:
          state.todos.find(todo => todo.id === action.id) || state.todoInPopup,
      };
    case 'resetPopupTodo':
      return {
        ...state,
        todoInPopup: null,
      };
    case 'setSeqrchQuery':
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  todoInPopup: null,
  filterValue: FilterValue.All,
  searchQuery: '',
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [{ todos, filterValue, todoInPopup, searchQuery }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider
        value={{ todos, filterValue, todoInPopup, searchQuery }}
      >
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
