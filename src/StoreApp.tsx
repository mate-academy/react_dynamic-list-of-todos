import React, { useContext, useEffect, useReducer } from 'react';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface AppState {
  loading: boolean;
  todos: Todo[];
  todo: Todo;
  users: User[];
  user: User;
  filter: Status;
  filteredTodos: Todo[];
  searchTerm: string;
  isModalOpen: boolean;
  modalLoading: boolean;
  isUserLoading: boolean;
}

interface AppContextType extends AppState {
  setLoading: (loading: boolean) => void;
  setFilter: (filter: Status) => void;
  setTodos: (todos: Todo[]) => void;
  setTodoModal: (todo: Todo) => void;
  setUsers: (users: User[]) => void;
  setUserModal: (user: User) => void;
  setSearchedTodos: (searchTerm: string) => void;
  clearSearchTerm: () => void;
  getUserForTodo: (todoId: number) => void;
  openModal: () => void;
  closeModal: () => void;
  openModalForTodo: (todoId: number) => void;
}

type Action = { type: 'set_loading'; payload: boolean }
| { type: 'set_todos'; payload: Todo[] }
| { type: 'set_todo_modal'; payload: Todo }
| { type: 'set_users'; payload: User[] }
| { type: 'set_user_modal'; payload: User }
| { type: 'set_filter'; payload: Status }
| { type: 'set_filtered_todos'; payload: Todo[] }
| { type: 'set_search_term'; payload: string }
| { type: 'clear_search_term' }
| { type: 'open_modal' }
| { type: 'close_modal' }
| { type: 'set_modal_loading'; payload: boolean };

const filterTodos = (
  todos: Todo[],
  filter: Status,
  searchTerm: string,
): Todo[] => {
  return todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filter === Status.All) {
      return matchesSearch;
    }

    if (filter === Status.Active) {
      return !todo.completed && matchesSearch;
    }

    return todo.completed && matchesSearch;
  });
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'set_loading':
      return {
        ...state,
        loading: action.payload,
      };

    case 'set_todos':
      return {
        ...state,
        todos: action.payload,
        filteredTodos: filterTodos(
          action.payload,
          state.filter,
          state.searchTerm,
        ),
      };

    case 'set_todo_modal':
      return {
        ...state,
        todo: action.payload,
      };

    case 'set_users':
      return {
        ...state,
        users: action.payload,
      };

    case 'set_user_modal':
      return {
        ...state,
        user: action.payload,
      };

    case 'set_filter':
      return {
        ...state,
        filter: action.payload,
        filteredTodos: filterTodos(
          state.todos,
          action.payload,
          state.searchTerm,
        ),
      };

    case 'set_filtered_todos':
      return {
        ...state,
        filteredTodos: action.payload,
      };

    case 'set_search_term':
      return {
        ...state,
        searchTerm: action.payload,
        filteredTodos: filterTodos(
          state.todos,
          state.filter,
          action.payload,
        ),
      };

    case 'clear_search_term':
      return {
        ...state,
        searchTerm: '',
        filter: Status.All,
        filteredTodos: filterTodos(
          state.todos,
          Status.All,
          '',
        ),
      };

    case 'open_modal':
      return {
        ...state,
        isModalOpen: true,
      };

    case 'close_modal':
      return {
        ...state,
        isModalOpen: false,
      };

    case 'set_modal_loading':
      return {
        ...state,
        modalLoading: action.payload,
      };

    default:
      return state;
  }
};

const initialAppState: AppState = {
  loading: false,
  todos: [],
  todo: {} as Todo,
  users: [],
  user: {} as User,
  filter: Status.All,
  filteredTodos: [],
  searchTerm: '',
  isModalOpen: false,
  modalLoading: false,
  isUserLoading: false,
};

const AppContext = React.createContext<AppContextType>({
  ...initialAppState,
  setLoading: () => {},
  setFilter: () => {},
  setTodos: () => {},
  setTodoModal: () => {},
  setUsers: () => {},
  setUserModal: () => {},
  setSearchedTodos: () => {},
  clearSearchTerm: () => {},
  getUserForTodo: () => {},
  openModal: () => {},
  closeModal: () => {},
  openModalForTodo: () => {},
});

export const useAppContext = () => useContext(AppContext);

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'set_loading', payload: loading });
  };

  const setTodos = (todos: Todo[]) => {
    dispatch({ type: 'set_todos', payload: todos });
  };

  const setTodoModal = (todo: Todo) => {
    dispatch({ type: 'set_todo_modal', payload: todo });
  };

  const setUsers = (users: User[]) => {
    dispatch({ type: 'set_users', payload: users });
  };

  const setUserModal = (user: User) => {
    dispatch({ type: 'set_user_modal', payload: user });
  };

  const setFilter = (filter: Status) => {
    dispatch({ type: 'set_filter', payload: filter });
  };

  const setSearchedTodos = (searchTerm: string) => {
    dispatch({ type: 'set_search_term', payload: searchTerm });
  };

  const clearSearchTerm = () => {
    dispatch({ type: 'clear_search_term' });
  };

  const openModal = () => {
    dispatch({ type: 'open_modal' });
  };

  const closeModal = () => {
    dispatch({ type: 'close_modal' });
  };

  const getUserForTodo = (todoId: number) => {
    const selectedTodo = state.todos.find(todo => todo.id === todoId);

    if (selectedTodo) {
      setLoading(true);

      getUser(selectedTodo.userId)
        .then(user => {
          setUsers([user]);
          setUserModal(user);
          setTodoModal(selectedTodo);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const openModalForTodo = (todoId: number) => {
    getUserForTodo(todoId);
    openModal();
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => {
        setTodos(todos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        setTodos,
        setUsers,
        setUserModal,
        setFilter,
        setSearchedTodos,
        clearSearchTerm,
        getUserForTodo,
        openModal,
        closeModal,
        setTodoModal,
        openModalForTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
