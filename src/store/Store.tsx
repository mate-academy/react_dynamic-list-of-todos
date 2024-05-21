import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { getTodos, getUser } from '../api';
import { User } from '../types/User';

export type Filter = 'all' | 'active' | 'completed';

type Action =
  | { type: 'LOAD_ALL_TODOS'; payload: Todo[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED'; payload: number }
  | { type: 'SET_TARGET_USER'; payload: User | null }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'RESET_QUERY' }
  | { type: 'UPDATE_FILTERED_TODOS'; payload: Todo[] };

interface State {
  todos: Todo[];
  loading: boolean;
  selectedTodo: {
    id: number;
    todo: Todo[];
  };
  targetUserInfo: User | null;
  filter: Filter;
  filteredTodos: Todo[];
  query: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_ALL_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_SELECTED':
      const updTodo =
        action.payload !== 0
          ? state.todos.filter(todo => todo.id === action.payload)
          : state.selectedTodo.todo;

      return {
        ...state,
        selectedTodo: {
          id: action.payload,
          todo: updTodo,
        },
      };
    case 'SET_TARGET_USER':
      return {
        ...state,
        targetUserInfo: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload.toLowerCase(),
      };
    case 'RESET_QUERY':
      return {
        ...state,
        query: '',
      };
    case 'UPDATE_FILTERED_TODOS':
      return {
        ...state,
        filteredTodos: action.payload,
      };
    default:
      return state;
  }
};

const initialState: State = {
  todos: [],
  loading: false,
  selectedTodo: {
    id: 0,
    todo: [
      {
        id: 0,
        title: '',
        completed: false,
        userId: 0,
      },
    ],
  },
  targetUserInfo: null,
  filter: 'all',
  filteredTodos: [],
  query: '',
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<React.Dispatch<Action>>(() => {});

type Props = {
  children: ReactNode;
};

export const GlobalAppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });

    getTodos()
      .then(data => dispatch({ type: 'LOAD_ALL_TODOS', payload: data }))
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  }, []);

  useEffect(() => {
    if (state.selectedTodo.id !== 0) {
      dispatch({ type: 'SET_LOADING', payload: true });

      getUser(state.selectedTodo.todo[0].userId)
        .then(data => {
          dispatch({ type: 'SET_TARGET_USER', payload: data });
          dispatch({ type: 'SET_LOADING', payload: false });
        })
        .catch(() => {
          dispatch({ type: 'SET_LOADING', payload: false });
        });
    }
  }, [state.selectedTodo.id, state.selectedTodo.todo]);

  useEffect(() => {
    let filtered = state.todos;

    if (state.filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (state.filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (state.query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(state.query),
      );
    }

    dispatch({ type: 'UPDATE_FILTERED_TODOS', payload: filtered });
  }, [state.todos, state.filter, state.query]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
