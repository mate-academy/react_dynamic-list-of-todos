/* eslint-disable */
// eslint-disable
import {  useMemo, useReducer } from 'react';
import { Todo } from "../types/Todo"
// import { getTodos } from '../api';
import React from 'react';
// import { getTodos } from '../api';

export enum ACTIONS {
  SET_LIST = 'setList',
  SET_VISIBLE_LIST = 'setVisibleList',
  SET_CURRENT_PAGE = 'setCurrentPage',
  SET_SEARCH_VALUE = 'setSearchValue',
  SORT = 'sortBy',
  SET_TODO = 'setTodo',
}

export enum FILTER {
  SEARCH = 'Search',
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLITED = 'Complited',
}

type Action = { type: ACTIONS.SET_LIST, payload: Todo[] }
| { type: ACTIONS.SET_VISIBLE_LIST, payload: Todo[] }
| { type: ACTIONS.SET_CURRENT_PAGE, payload: number }
| { type: ACTIONS.SET_SEARCH_VALUE, payload: string }
| { type: ACTIONS.SET_TODO, payload: Todo }
| { type: ACTIONS.SORT, payload: string };

interface State {
  list: Todo[],
  visibleList: Todo[],
  currentPage: number,
  sortBy: string,
  searchValue: string,
  selectedTodo: Todo,
}

type Props = {
  children: React.ReactNode;
}

function search(state: State): Todo[] {
  const itemsPerPage = 18;
  const lastIndex = state.currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;
  const filteredTodos = state.list.filter(todo => todo.title.includes(state.searchValue));
      console.log(filteredTodos, 'filteredTodos in context');

      const chunk = filteredTodos.slice(firstIndex, lastIndex);
      return chunk;
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
  currentPage: 1,
  sortBy: 'All',
  searchValue: '',
  selectedTodo: {} as Todo,
}

export const StateContext = React.createContext(InitialState);
export const DispatchContext = React.createContext((_action: Action) => {});

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const itemsPerPage = 18;
  const lastIndex = state.currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  function sort() {
    if (state.sortBy === FILTER.ALL) {
      // make a chunk and set it to the visibleList
      const chunk = [...state.list.slice(firstIndex, lastIndex)];
      return chunk;
    }
    else if (state.sortBy === FILTER.ACTIVE) {
      // filter array by field "complited" make a chunk
      const filteredTodos = state.list.filter(todo => !todo.completed);
      // console.log(filteredTodos, 'filteredTodos in context');
      const chunk = filteredTodos.slice(firstIndex, lastIndex);
      return chunk;
    }
    else if (state.sortBy === FILTER.COMPLITED) {
      // filter array by field "active" make a chunk then
      const filteredTodos = state.list.filter(todo => todo.completed);
      const chunk = filteredTodos.slice(firstIndex, lastIndex);

      return chunk;
    }
    else  {
      // filter array by field "search" with includes make a chunk
      const filteredTodos = state.list.filter(todo => todo.title.includes(state.searchValue));
      console.log(filteredTodos, 'filteredTodos in context');

      const chunk = filteredTodos.slice(firstIndex, lastIndex);
      return chunk;
    }
    // else {
    //   return state.list;
    // }
  }
// console.log(state.visibleList, 'visible.list');


// temporary moved to App.tsx
  // useEffect(() =>{
  //   console.log('start loading');

  //   getTodos()
  //     .then(res => {
  //       dispatch({ type: ACTIONS.SET_LIST, payload: res })
  //     })
  //     .catch(() => console.log('error'))
  //     .finally(() => console.log('stop loading'));
  // }, []);

  useMemo(() => {
    if (state.searchValue.length > 0) {
      dispatch({ type: ACTIONS.SET_VISIBLE_LIST, payload: search(state) })
    } else {
      dispatch({ type: ACTIONS.SET_VISIBLE_LIST, payload: sort() })
    }
  },[state.list, state.currentPage, state.sortBy, state.searchValue]);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
      {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

