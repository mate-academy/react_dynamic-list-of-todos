import {
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { getTodos } from '../../api';
import { Select } from '../../types/Select';
import { Todo } from '../../types/Todo';

type ContextType = {
  todos: Todo[];
  filtredTodos: Todo[];
  loadTodosError: boolean;
  getTodosData: () => void;
  FiltredTodosBySearch: (query: string) => void;
  FiltredTodosBySelect: (value: string) => void;
};

export const TodosContext = createContext<ContextType>({
  todos: [],
  filtredTodos: [],
  loadTodosError: false,
  getTodosData: () => {},
  FiltredTodosBySearch: () => {},
  FiltredTodosBySelect: () => {},
});

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [loadTodosError, setLoadTodoError] = useState(false);

  const getTodosData = useCallback(async () => {
    try {
      const data = await getTodos();

      setFiltredTodos(data);
      setTodos(data);
    } catch (error) {
      setLoadTodoError(true);
    }
  }, []);

  useEffect(() => {
    getTodosData();
  }, []);

  const FiltredTodosBySearch = useCallback((query: string) => {
    const lowerCaseQuery = query.toLowerCase();

    setFiltredTodos(todos.filter(todo => (
      todo.title.toLowerCase().includes(lowerCaseQuery)
    )));
  }, [todos]);

  const FiltredTodosBySelect = useCallback((value: string) => {
    setFiltredTodos(todos.filter(todo => {
      switch (value) {
        case Select.all:
          return todo;
        case Select.active:
          return !todo.completed;
        case Select.completed:
          return todo.completed;
        default:
          return todo;
      }
    }));
  }, [todos]);

  const contextValue = {
    todos,
    filtredTodos,
    loadTodosError,
    getTodosData,
    FiltredTodosBySearch,
    FiltredTodosBySelect,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
