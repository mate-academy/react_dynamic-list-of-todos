import { createContext, Dispatch, useReducer } from 'react';
import { Action } from '../types/Action';
import { ActionTypes } from '../types/ActionTypes';
import { Todo } from '../types/Todo';

type State = {
  selectedTodo: Todo | null,
};

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_TODO:
      return {
        ...state,
        selectedTodo: action.selectedTodo || null,
      };
    default:
      return state;
  }
};

const intialState: State = {
  selectedTodo: null,
};

export const DispatchContext = createContext<Dispatch<Action>>(
  () => {},
);
export const StateContext = createContext(intialState);

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
