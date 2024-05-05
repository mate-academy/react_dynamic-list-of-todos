import React, { useReducer, createContext, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';
import { Filter } from '../types/Filter';

type Action =
  | { type: 'setTodos'; todos: Todo[] }
  | { type: 'setFiltered'; filtered: Todo[] }
  | { type: 'todoModal'; todo: Todo }
  | { type: 'toggleLoading'; isLoading: boolean }
  | { type: 'modalLoading'; modalLoading: boolean }
  | { type: 'filterTodos'; query: string }
  | { type: 'changeFilterValue'; filterType: Filter }
  | { type: 'SET_FILTER'; filter: string }
  | { type: 'showModal'; isModal: boolean };

type FilterFunction = (arg: string) => void;

interface State {
  todos: Todo[];
  filtered: Todo[];
  todo: Todo | null;
  isLoading: boolean;
  isModal: null | boolean;
  modalLoading: boolean;
  filterType: Filter;
  filter: string;
  setFilter: FilterFunction;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setTodos':
      return {...state, todos: action.todos };
    case 'todoModal':
      return {...state, todo: action.todo };
    case 'toggleLoading':
      return {...state, isLoading: action.isLoading };
    case 'modalLoading':
      return {...state, modalLoading: action.modalLoading };
    case 'showModal':
      return {
        ...state,
        isModal: action.isModal,
      };
    case 'setFiltered':
      return {...state, filtered: action.filtered };
    case 'filterTodos':
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.title.toLowerCase()
            .includes(action.query.trim().toLowerCase()
            )
        )
      };
    case 'changeFilterValue':
      return {...state, filterType: action.filterType };
    case 'SET_FILTER':
      return {...state, filter: action.filter };
    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  filtered: [],
  filter: '',
  filterType: Filter.All,
  todo: null,
  isLoading: false,
  isModal: false,
  modalLoading: true,
  setFilter: () => {},
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);

interface Props {
  children: React.ReactNode;
}

export const GlobalTodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'toggleLoading', isLoading: true });
    getTodos()
      .then((data) => {
        const todos = data as Todo[];

        dispatch({ type: 'setTodos', todos: todos });
      })
      .finally(() => dispatch({ type: 'toggleLoading', isLoading: false }));
  }, []);

  const setFilter = (filter: string) => {
    dispatch({ type: 'SET_FILTER', filter });
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={
        { ...state, filter: state.filter, setFilter }
      }>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
