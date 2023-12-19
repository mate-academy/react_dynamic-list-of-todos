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
  qwerty: string;
  setQwerty: React.Dispatch<React.SetStateAction<string>>;
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

interface MyContextProviderProps {
  children: ReactNode;
}

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [todosFromServer, setAllTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [qwerty, setQwerty] = useState<string>('');
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

  // zustand

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
      case 'all':
        modifiedTodo = todosFromServer;
        break;
      case 'active':
        modifiedTodo = todosFromServer.filter((todo) => !todo.completed);
        break;
      case 'completed':
        modifiedTodo = todosFromServer.filter((todo) => todo.completed);
        break;
      default:
        break;
    }

    const modifiedValue = qwerty.toLocaleLowerCase();

    const filtered = modifiedTodo.filter((todo) => {
      return todo.title.toLocaleLowerCase().includes(modifiedValue);
    });

    setFilteredTodos(filtered);
  }, [qwerty, sortType, todosFromServer]);

  const contextValue: MyContextProps = {
    todos: filteredTodos,
    setTodos: setFilteredTodos,
    TodosFromServer: todosFromServer,
    isLoading,
    qwerty,
    setQwerty,
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

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('');
  }

  return context;
};

export default MyContextProvider;
