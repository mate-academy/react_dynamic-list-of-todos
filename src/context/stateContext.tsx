/* eslint-disable @typescript-eslint/indent */
import React, { useContext, useEffect, useReducer } from 'react';
import { TodoContext } from './todoContext';
import { Filter, StoreState, TodoFilterStatus } from '../types/StoreState';
import { reducer } from '../store/Store';

type StoreContextType = {
  state: StoreState;
  dispatch: React.Dispatch<Filter>;
};

type Props = {
  children?: React.ReactNode;
};

const initialState: StoreState = {
  allTodos: [],
  todos: [],
  inLoadTodo: true,
  inLoadModal: { opened: false },
  filter: {
    search: '',
    status: TodoFilterStatus.All,
  },
};

export const StateContext = React.createContext<StoreContextType>({
  state: initialState,
  dispatch: () => {},
});

export const StateProvider: React.FC<Props> = ({ children }) => {
  const { todos } = useContext(TodoContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (todos.length > 0) {
      dispatch({ type: 'init', payload: todos });
      dispatch({ type: 'load', payload: false });
    }
  }, [todos]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
