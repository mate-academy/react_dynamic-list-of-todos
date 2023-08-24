/* eslint-disable */
// eslint-disable
import { useEffect, useMemo, useReducer } from 'react';
import { Todo } from "../types/Todo"
import { getTodos } from '../api';
import React from 'react';
// import { getTodos } from '../api';

export enum ACTIONS {
  SET_LIST = 'setList',
  SET_VISIBLE_LIST = 'setVisibleList',
  SET_CURRENT_PAGE = 'setCurrentPage',
}

type Action = { type: ACTIONS.SET_LIST, payload: Todo[] }
| { type: ACTIONS.SET_VISIBLE_LIST, payload: Todo[] }
| { type: ACTIONS.SET_CURRENT_PAGE, payload: number };

interface State {
  list: Todo[],
  visibleList: Todo[],
  currentPage: number,
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
    case ACTIONS.SET_CURRENT_PAGE:
      return {
      ...state,
      currentPage: action.payload,
    }
    default:
      return state;
  }
}
const InitialState: State = {
  list: [],
  visibleList: [],
  currentPage: 1,
}

export const StateContext = React.createContext(InitialState);
export const DispatchContext = React.createContext((_action: Action) => {});

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const itemsPerPage = 18;
  const lastIndex = state.currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;
  // console.log(firstIndex, 'index', lastIndex, 'lastIndex');
  const chunk = [...state.list.slice(firstIndex, lastIndex)]
  // console.log(chunk, 'chunk');

  useEffect(() =>{
    getTodos()
      .then(res => {
        dispatch({ type: ACTIONS.SET_LIST, payload: res })
      })
  }, []);

  useMemo(() => {
    dispatch({ type: ACTIONS.SET_VISIBLE_LIST, payload: chunk })
  },[state.list, state.currentPage])
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
      {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

