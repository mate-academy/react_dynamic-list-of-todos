import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterBy';
import { getTodos } from '../api';
import { User } from '../types/User';

type TodoContextType = {
  filteredTodos: Todo[];
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  todos: Todo[];
  query: string;
  setQuery: (text: string) => void;
  handleChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [filter, setFilter] = useState(FilterType.ALL);

  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = useMemo(() => {
    let preparedTodos = [...todos];

    if (query) {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (filter) {
      case FilterType.ACTIVE:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
      case FilterType.COMPLETED:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
      default:
        return preparedTodos;
    }

    return preparedTodos;
  }, [todos, filter, query]);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const fetchTodos = () => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const contextValue = useMemo(
    () => ({
      filteredTodos,
      filter,
      setFilter,
      todos,
      query,
      setQuery,
      handleChangeQuery,
      isLoading,
      selectedTodo,
      setSelectedTodo,
      user,
      setUser,
    }),
    [filteredTodos, filter, todos, query, isLoading, selectedTodo, user],
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};

export default TodoContext;
