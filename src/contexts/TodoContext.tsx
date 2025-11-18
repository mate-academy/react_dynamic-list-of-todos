import React, { useEffect } from 'react';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { FilterType } from '../types/FilterType';
import { getTodos, getUser } from '../api';

type TodoContextType = {
  loadTodos: () => void;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedFilter: FilterType;
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  visibleTodos: Todo[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTitle: string;
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  userTodo: Todo;
  isLoading: boolean;
  hasError: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  setUserTodo: React.Dispatch<React.SetStateAction<Todo>>;
  userError: boolean;
  isUserLoading: boolean;
  handleOpenUserModal: (todo: Todo) => void;
  handleCloseUserModal: () => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const todoContext = React.createContext<TodoContextType>({
  loadTodos: () => {},
  todos: [],
  setTodos: () => {},
  selectedFilter: 'all',
  setSelectedFilter: () => {},
  visibleTodos: [],
  modalOpen: false,
  setModalOpen: () => {},
  searchTitle: '',
  setSearchTitle: () => {},
  user: {
    id: 0,
    name: '',
    email: '',
    phone: '',
  },
  setUser: () => {},
  userTodo: {
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  },
  setUserTodo: () => {},
  hasError: false,
  isLoading: true,
  setIsLoading: () => {},
  setHasError: () => {},
  userError: false,
  isUserLoading: true,
  handleOpenUserModal: () => {},
  handleCloseUserModal: () => {},
  handleSearchChange: () => {},
});

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<FilterType>('all');
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [searchTitle, setSearchTitle] = React.useState<string>('');
  const [userTodo, setUserTodo] = React.useState<Todo>({
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  });
  const [user, setUser] = React.useState<User>({} as User);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isUserLoading, setIsUserLoading] = React.useState<boolean>(true);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [userError, setUserError] = React.useState<boolean>(false);

  const loadTodos = React.useCallback(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const filteredTodos = React.useMemo(() => {
    const activeTodos = todos.filter(todo => todo.completed === false);
    const completedTodos = todos.filter(todo => todo.completed === true);

    switch (selectedFilter) {
      case 'active':
        return activeTodos;
      case 'completed':
        return completedTodos;
      default:
        return todos;
    }
  }, [todos, selectedFilter]);

  const handleOpenUserModal = (todo: Todo) => {
    setUserTodo(todo);
    setUser({} as User);
    getUser(todo.userId)
      .then(setUser)
      .catch(() => setUserError(true))
      .finally(() => setIsUserLoading(false));
    setModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setModalOpen(false);
    setUser({} as User);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const treatedSearch = searchTitle.toLowerCase().trim();
  const visibleTodos = filteredTodos.filter(todo =>
    todo.title.toLowerCase().includes(treatedSearch),
  );

  const contextValue = {
    loadTodos,
    todos,
    setTodos,
    selectedFilter,
    setSelectedFilter,
    visibleTodos,
    modalOpen,
    setModalOpen,
    searchTitle,
    setSearchTitle,
    user,
    setUser,
    userTodo,
    setUserTodo,
    isLoading,
    hasError,
    setIsLoading,
    setHasError,
    isUserLoading,
    userError,
    handleOpenUserModal,
    handleCloseUserModal,
    handleSearchChange,
  };

  return (
    <todoContext.Provider value={contextValue}>{children}</todoContext.Provider>
  );
};
