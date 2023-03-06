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
  filteredTodos: Todo[];
  loadTodosError: boolean;
  getTodosData: () => void;
  filterTodosBySearch: (query: string) => void;
  filterTodosBySelect: (value: string) => void;
};

export const TodosContext = createContext<ContextType>({
  todos: [],
  filteredTodos: [],
  loadTodosError: false,
  getTodosData: () => {},
  filterTodosBySearch: () => {},
  filterTodosBySelect: () => {},
});

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loadTodosError, setLoadTodoError] = useState(false);

  const getTodosData = useCallback(async () => {
    try {
      const data = await getTodos();

      setFilteredTodos(data);
      setTodos(data);
    } catch (error) {
      setLoadTodoError(true);
    }
  }, []);

  useEffect(() => {
    getTodosData();
  }, []);

  const filterTodosBySearch = useCallback((query: string) => {
    const lowerCaseQuery = query.toLowerCase();

    setFilteredTodos(todos.filter(todo => (
      todo.title.toLowerCase().includes(lowerCaseQuery)
    )));
  }, [todos]);

  const filterTodosBySelect = useCallback((value: string) => {
    setFilteredTodos(todos.filter(todo => {
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
    filteredTodos,
    loadTodosError,
    getTodosData,
    filterTodosBySearch,
    filterTodosBySelect,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
