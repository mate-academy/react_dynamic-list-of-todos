import React from 'react';

import { Action } from '../../types/Action';
import { State } from '../../types/State';

const initialState: State = {
  todos: [],
  selectedTodo: null,
  user: null,
  filter: 'all',
  query: '',
  modalVisible: false,
  isLoadingTodos: false,
  isLoadingUsers: false,
};

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'FETCH_TODOS':
      return {
        ...state,
        isLoadingTodos: true,
      };

    case 'FETCH_USERS':
      return {
        ...state,
        isLoadingUsers: true,
      };

    case 'FETCH_TODOS_SUCCESS':
      return {
        ...state,
        todos: payload,
        isLoadingTodos: false,
      };

    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        user: payload,
        isLoadingUsers: false,
      };

    case 'SET_SELECTED_TODO':
      return {
        ...state,
        selectedTodo: payload,
        modalVisible: true,
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: payload,
      };

    case 'SET_QUERY':
      return {
        ...state,
        query: payload,
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        modalVisible: false,
        selectedTodo: null,
      };

    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

const TodoStateContext = React.createContext(initialState);
//eslint-disable-next-line
const TodoDispatchContext = React.createContext((_action: Action) => {});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export const useTodoState = () => React.useContext(TodoStateContext);
export const useTodoDispatch = () => React.useContext(TodoDispatchContext);
