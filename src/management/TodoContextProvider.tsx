import React, { useEffect, useReducer } from 'react';
import { getTodos } from '../api';
import { Filter } from '../types/Filter';
import { State } from '../types/State';
import { Action, reducer } from './reducer';

const initialState: State = {
  todos: [],
  currentTodo: null,
  currentUser: null,
  isEyeSlash: false,
  filterBy: Filter.all,
  query: '',
};

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext<React.Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode;
};

export const TodoContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      dispatch({ type: 'getTodos', payload: todosFromServer });
    });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
