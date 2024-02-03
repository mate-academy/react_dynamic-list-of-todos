import React, {
  useEffect, useMemo, useReducer,
} from 'react';
import { Todo } from '../types/Todo';
import { FilterOptions } from '../types/FilterOptions';
import { getTodos } from '../api';
import { FilterStatus } from '../types/FilterStatus';

interface State {
  todos: Todo[],
  filterOptions: FilterOptions,
  selectedTodo: Todo,
}

interface Props {
  children: React.ReactNode,
}

type Action = {
  type: 'selectTodo',
  selectedTodo: Todo,
} | {
  type: 'filterBy',
  filterOptions: FilterOptions,
} | {
  type: 'setTodos'
  todos: Todo[],
};

export const TodosContext = React.createContext({
  todos: [] as Todo[],
  filterOptions: {
    status: FilterStatus.All,
    query: '',
  } as FilterOptions,
  selectedTodo: {} as Todo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterByQuery: (_query: string) => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectTodo: (_selectedTodo: Todo) => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterByStatus: (_status: FilterStatus) => { },
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'selectTodo':
      return {
        ...state,
        selectedTodo: action.selectedTodo,
      };
    case 'filterBy':
      return {
        ...state,
        filterOptions: action.filterOptions,
      };
    case 'setTodos':
      return {
        ...state,
        todos: action.todos,
      };
    default:
      return state;
  }
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    todos: [] as Todo[],
    filterOptions: {
      query: '',
      status: FilterStatus.All,
    } as FilterOptions,
    selectedTodo: null as unknown as Todo,
  });

  useEffect(() => {
    getTodos().then((todos) => {
      dispatch({
        type: 'setTodos',
        todos,
      });
    });
  }, []);

  const value = useMemo(() => ({
    todos: state.todos,
    filterOptions: state.filterOptions,
    selectedTodo: state.selectedTodo,

    filterByQuery: (query: string) => dispatch({
      type: 'filterBy',
      filterOptions: {
        ...state.filterOptions,
        query,
      },
    }),
    filterByStatus: (status: FilterStatus) => dispatch({
      type: 'filterBy',
      filterOptions: {
        ...state.filterOptions,
        status,
      },
    }),
    selectTodo: (selectedTodo: Todo) => dispatch({
      type: 'selectTodo',
      selectedTodo,
    }),
  }), [state]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
