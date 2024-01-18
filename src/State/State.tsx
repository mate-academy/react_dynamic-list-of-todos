import React, { useReducer } from 'react';
import { Filter } from '../types/Filter';

type State = {
  filterBy: Filter;
  query: string;
  appliedQuery: string;
};

type Action
= { type: 'setFilter', payload: Filter }
| { type: 'query', payload: string }
| { type: 'appliedQuery', payload: string };

type Props = {
  children: React.ReactNode;
};

const initialState: State = {
  filterBy: Filter.all,
  query: '',
  appliedQuery: '',
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'setFilter':

      return {
        ...state,
        filterBy: action.payload,
      };

    case 'query':
      return {
        ...state,
        query: action.payload,
      };

    case 'appliedQuery':
      return {
        ...state,
        appliedQuery: action.payload,
      };

    default:
      return state;
  }
}

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext((() => { }) as React.Dispatch<Action>);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
