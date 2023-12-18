import
React, {
  createContext, useContext, useEffect, useState, ReactNode,
}
  from 'react';
import { getTodos, getUser } from '../api';
import { User } from '../types/User';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

interface MyContextProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  TodosFromServer: Todo[];
  isLoad: boolean;
  handleCompletedTodos: (sortType: string) => void;
  searchTodo: (value: string) => void;
  activeTodo: Todo | null;
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [TodosFromServer, setAllTodos] = useState<Todo[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then((allTodos: Todo[]) => {
      const todoPromises = allTodos.map(todo => {
        return getUser(todo.userId)
          .then((user: User) => {
            const updatedTodo = { ...todo, user };

            return updatedTodo;
          });
      });

      Promise.all(todoPromises)
        .then(todoWithUser => {
          setAllTodos(todoWithUser);
          setTodos(todoWithUser);
          setIsLoad(false);
        });
    });
  }, []);

  const handleCompletedTodos = (sortType: string) => {
    let completedTodos: Todo[] = todos;

    switch (sortType) {
      case 'all':
        setTodos(TodosFromServer);
        break;
      case 'active':
        completedTodos = TodosFromServer.filter(todo => !todo.completed);
        setTodos(completedTodos);
        break;
      case 'completed':
        completedTodos = TodosFromServer.filter(todo => todo.completed);
        setTodos(completedTodos);
        break;
      default:
        break;
    }
  };

  const searchTodo = (value: string) => {
    const modifiedValue = value.toLocaleLowerCase().trim();

    const searchedValue = TodosFromServer.filter(
      todo => todo.title.toLocaleLowerCase().includes(modifiedValue),
    );

    setTodos(searchedValue);
  };

  const contextValue: MyContextProps = {
    todos,
    setTodos,
    TodosFromServer,
    isLoad,
    handleCompletedTodos,
    searchTodo,
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
    throw new Error('useMyContext must be used within a MyContextProvider');
  }

  return context;
};

export default MyContextProvider;
