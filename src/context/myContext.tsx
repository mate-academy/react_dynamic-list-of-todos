import React, {
  createContext, useContext, useEffect, useState, ReactNode,
} from 'react';
import { getTodos, getUser } from '../api';
import { User } from '../types/User';
import { Todo } from '../types/Todo';

interface MyContextProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  TodosFromServer: Todo[];
  isLoading: boolean;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  sortType: string | null,
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  activeUser: User | null;
  setActiveUser: React.Dispatch<React.SetStateAction<User | null>>;
  isUserLoading: boolean;
  setIsUserLoading: React.Dispatch<React.SetStateAction<boolean>>
  activeTodo: Todo | null
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo | null>>
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface TodoContextProviderProps {
  children: ReactNode;
}

enum SortType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const TodoContextProvider: React.FC<TodoContextProviderProps>
= ({ children }) => {
  const [todosFromServer, setAllTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [sortType, setSortType] = useState<string>('all');
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then((allTodos: Todo[]) => {
        setAllTodos(allTodos);
        setFilteredTodos(allTodos);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsUserLoading(true);
    if (activeTodo?.userId) {
      getUser(activeTodo?.userId)
        .then(setActiveUser)
        .finally(() => {
          setIsUserLoading(false);
        });
    }
  }, [activeTodo]);

  useEffect(() => {
    let modifiedTodo: Todo[] = [];

    switch (sortType) {
      case SortType.ALL:
        modifiedTodo = todosFromServer;
        break;
      case SortType.ACTIVE:
        modifiedTodo = todosFromServer.filter((todo) => !todo.completed);
        break;
      case SortType.COMPLETED:
        modifiedTodo = todosFromServer.filter((todo) => todo.completed);
        break;
      default:
        break;
    }

    const modifiedValue = query.toLocaleLowerCase();

    const filtered = modifiedTodo.filter((todo) => {
      return todo.title.toLocaleLowerCase().includes(modifiedValue);
    });

    setFilteredTodos(filtered);
  }, [query, sortType, todosFromServer]);

  const contextValue: MyContextProps = {
    todos: filteredTodos,
    setTodos: setFilteredTodos,
    TodosFromServer: todosFromServer,
    isLoading,
    query,
    setQuery,
    sortType,
    setSortType,
    activeUser,
    setActiveUser,
    isUserLoading,
    setIsUserLoading,
    activeTodo,
    setActiveTodo,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('');
  }

  return context;
};

export default TodoContextProvider;
