/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';
import { User } from '../types/User';

type Action =
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'setUsers'; payload: User }
  | { type: 'select'; value: string }
  | { type: 'filter'; value: string }
  | { type: 'clearQuery' }
  | {
      type: 'seeMore';
      curruntId: number;
      currentTitile: string;
      statusComleted: boolean;
      userId: number;
    }
  | { type: 'close' };

interface State {
  todos: Todo[];
  user: User | null;
  select: string;
  query: string;
  clearQuery: boolean;
  seeMore: boolean;
  userId: number;
  statusCompleted: boolean;
  currentTitle: string;
  currentId: number;
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setTodos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'setUsers':
      return {
        ...state,
        user: action.payload,
      };

    case 'select':
      return {
        ...state,
        select: action.value,
      };

    case 'filter':
      return {
        ...state,
        query: action.value,
        clearQuery: true,
      };

    case 'clearQuery':
      return {
        ...state,
        clearQuery: false,
        query: '',
      };

    case 'seeMore':
      return {
        ...state,
        seeMore: true,
        currentTitle: action.currentTitile,
        currentId: action.curruntId,
        statusCompleted: action.statusComleted,
        userId: action.userId,
      };

    case 'close': {
      return {
        ...state,
        seeMore: false,
        user: null,
        currentId: 0,
      };
    }

    default:
      return state;
  }
};

const initialState: State = {
  todos: [],
  user: null,
  select: 'all',
  query: '',
  clearQuery: false,
  seeMore: false,
  userId: 0,
  statusCompleted: false,
  currentTitle: '',
  currentId: 0,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((_action: Action) => {});

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    switch (state.select) {
      case 'all':
        getTodos().then(todos => {
          return dispatch({
            type: 'setTodos',
            payload: todos.filter(todo =>
              todo.title.toUpperCase().includes(state.query.toUpperCase()),
            ),
          });
        });

        break;

      case 'active':
        getTodos().then(todos => {
          return dispatch({
            type: 'setTodos',
            payload: todos
              .filter(todo => !todo.completed)
              .filter(todo =>
                todo.title.toUpperCase().includes(state.query.toUpperCase()),
              ),
          });
        });

        break;

      case 'completed':
        getTodos().then(todos => {
          return dispatch({
            type: 'setTodos',
            payload: todos
              .filter(todo => todo.completed)
              .filter(todo =>
                todo.title.toUpperCase().includes(state.query.toUpperCase()),
              ),
          });
        });

        break;
    }
  }, [state.select, state.query, state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
