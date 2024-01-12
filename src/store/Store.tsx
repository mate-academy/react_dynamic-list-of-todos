import React, { createContext, useReducer } from 'react';
import { Action } from './Action';
import { ActionTypes } from './ActionTypes';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type State = {
  currentTodo: Todo | null;
  status: Status;
  query: string;
};

const initialState: State = {
  currentTodo: null,
  status: Status.All,
  query: '',
};

function reducer(state: State, action: Action): State {
  const { currentTodo } = state;

  switch (action.type) {
    case ActionTypes.ToggleTodoModal:
      return {
        ...state,
        currentTodo: currentTodo === null ? action.payload.todo : null,
      };

    case ActionTypes.ChangeStatus:
      return {
        ...state,
        status: action.payload.status,
      };

    case ActionTypes.ChangeQuery:
      return {
        ...state,
        query: action.payload.query,
      };

    default:
      return state;
  }
}

export const StateContext = createContext(initialState);

export const DispatchContext = createContext<(action: Action) => void>(
  () => {});

type Provider = {
  children: React.ReactNode
};

export const StateProvider: React.FC<Provider> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
