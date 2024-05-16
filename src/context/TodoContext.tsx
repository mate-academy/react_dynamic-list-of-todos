import { useReducer, createContext, ReactNode, Dispatch } from 'react';
import { Todo } from '../types/Todo';

export enum SelectOptions {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type RootState = {
  currentTodo: Todo | null;
  openModal: boolean;
  filter: SelectOptions;
  query: string;
};

const initialState: RootState = {
  currentTodo: null,
  openModal: false,
  filter: SelectOptions.All,
  query: '',
};

export enum ActionTypes {
  CURRENT_TODO = 'CURRENT_TODO',
  OPEN_MODAL = 'OPEN_MODAL',
  SET_SELECT = 'SET_SELECT',
  SET_QUERY = 'SET_QUERY',
}

type Action =
  | {
      type: ActionTypes.CURRENT_TODO;
      payload: Todo | null;
    }
  | {
      type: ActionTypes.OPEN_MODAL;
      payload: boolean;
    }
  | {
      type: ActionTypes.SET_SELECT;
      payload: SelectOptions;
    }
  | {
      type: ActionTypes.SET_QUERY;
      payload: string;
    };

const reducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
    case ActionTypes.CURRENT_TODO:
      return { ...state, currentTodo: action.payload };
    case ActionTypes.OPEN_MODAL:
      return { ...state, openModal: action.payload };
    case ActionTypes.SET_SELECT:
      return {
        ...state,
        filter: action.payload,
      };
    case ActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export const StateContext = createContext<RootState>(initialState);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
