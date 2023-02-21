import React, { createContext, useReducer } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

type State = {
  listTodos: Todo[],
  check: number | null,
  user: User | null,
  checkTodo: Todo | null,
  filter: string,
  filterBySearch: string
};

export type Action =
    { type: 'RequestListTodos', list: Todo[] }
    | { type: 'CheckedUser', userId: number | null }
    | { type: 'InfoUser', user: User | null }
    | { type: 'CheckedTodo', todo: Todo | null }
    | { type: 'TypeFilter', filter: string }
    | { type: 'SearchLine', filter: string };

export const initialState: State = {
  listTodos: [],
  check: null,
  user: null,
  checkTodo: null,
  filter: 'all',
  filterBySearch: '',
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'RequestListTodos':
      return {
        ...state,
        listTodos: action.list,
      };
    case 'CheckedUser':
      return {
        ...state,
        check: action.userId,
      };
    case 'InfoUser':
      return {
        ...state,
        user: action.user,
      };
    case 'CheckedTodo':
      return {
        ...state,
        checkTodo: action.todo,
      };
    case 'TypeFilter':
      return {
        ...state,
        filter: action.filter,
      };
    case 'SearchLine':
      return {
        ...state,
        filterBySearch: action.filter,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext<
[State, React.Dispatch<Action>]
>([initialState, (obj:Action) => obj]);

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default StateProvider;
