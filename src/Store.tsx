import React, { createContext, Dispatch, useReducer } from 'react';
import { stateReducer } from './reducers/reducer';
import { Action } from './types/Action';
import { State } from './types/State';
import { Filter } from './types/Filter';

const defaultDispatch: Dispatch<Action> = () => {};

const initialState: State = {
  todos: [],
  openedTodo: {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  },
  user: {
    id: 0,
    name: '',
    email: '',
    phone: '',
  },
  filter: {
    option: Filter.All,
    query: '',
  },
  isModalOpened: false,
  isLoadingTodos: true,
  isLoadingUser: true,
};

export const DispatchContext = createContext(defaultDispatch);
export const StateContext = createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
