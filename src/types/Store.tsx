import { createContext, useReducer } from 'react';
import React from 'react';
import { Todo } from './Todo';

// TYPES:
export type State = {
  // HOW WE STORE OUR DATA
  todos: Todo[];
  filterTodos: 'all' | 'active' | 'completed';
  filterString: string;
  selectedTodoId: number;
};

export type Action =
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'setFilterTodos'; name: 'all' | 'active' | 'completed' }
  | { type: 'setFilterString'; payload: string }
  | { type: 'setSelectedTodoId'; payload: number };

const initialState: State = {
  todos: [],
  filterTodos: 'all',
  filterString: '',
  selectedTodoId: 0,
};

const reducer = (state: State, action: Action): State => {
  let newState: State = state;

  switch (action.type) {
    case 'setTodos':
      newState = {
        ...state,
        todos: action.payload,
      };
      break;
    case 'setFilterTodos':
      newState = {
        ...state,
        filterTodos: action.name,
      };
      break;
    case 'setFilterString':
      newState = {
        ...state,
        filterString: action.payload,
      };
      break;
    case 'setSelectedTodoId':
      newState = {
        ...state,
        selectedTodoId: action.payload,
      };
      break;
    default:
      newState = state;
  }

  return newState;
};

type InitialDispatch = (action: Action) => void;

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<InitialDispatch>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
