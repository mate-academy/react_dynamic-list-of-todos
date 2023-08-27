/* eslint-disable */
// eslint-disable
import {
  useReducer,
  //  useMemo,
} from 'react';
import { Todo } from "../types/Todo"
import React from 'react';

export enum ACTIONS {
  SET_LIST = 'setList',
  SET_VISIBLE_LIST = 'setVisibleList',
  SET_SEARCH_VALUE = 'setSearchValue',
  SORT = 'sortBy',
  SET_TODO = 'setTodo',
}

export enum FILTER {
  SEARCH = 'Search',
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLITED = 'Completed',
}

type Action = { type: ACTIONS.SET_LIST, payload: Todo[] }
  | { type: ACTIONS.SET_VISIBLE_LIST, payload: Todo[] }
  | { type: ACTIONS.SET_SEARCH_VALUE, payload: string }
  | { type: ACTIONS.SET_TODO, payload: Todo }
  | { type: ACTIONS.SORT, payload: string };

interface State {
  list: Todo[],
  visibleList: Todo[],
  sortBy: string,
  searchValue: string,
  selectedTodo: Todo,
}

type Props = {
  children: React.ReactNode;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.SET_LIST:
      return {
        ...state,
        list: action.payload,
      }
    case ACTIONS.SET_VISIBLE_LIST:
      return {
        ...state,
        visibleList: action.payload,
      }
    case ACTIONS.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      }
    case ACTIONS.SORT:
      return {
        ...state,
        sortBy: action.payload,
      }
    case ACTIONS.SET_TODO:
      return {
        ...state,
        selectedTodo: action.payload,
      }
    default:
      return state;
  }
}
const InitialState: State = {
  list: [],
  visibleList: [],
  sortBy: 'All',
  searchValue: '',
  selectedTodo: {} as Todo,
}

export const StateContext = React.createContext(InitialState);
export const DispatchContext = React.createContext((_action: Action) => { });

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

