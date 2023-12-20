import {
  createContext, FC, useContext, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

type TodoContextType = {
  todos: Todo[] | null;
  visibleTodos: Todo[];
  filter: string;
  handleQueryChange: (newQuery: string) => void;
  query: string;
  handleSelectFilter: (newFilter: string) => void;
  selectedTodo: Todo | null;
  handleSelectTodo: (todo: Todo) => () => void;
  handleClose: () => void;
};

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

type Props = {
  children: React.ReactNode
};

export const TodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const getTodosFormApi = async () => {
      const data: Todo[] = await getTodos();

      setTodos(data);
    };

    getTodosFormApi();
  }, []);

  const visibleTodos = useMemo(() => {
    let todosCopy = [...todos];

    if (todos) {
      switch (filter) {
        case 'completed':
          todosCopy = todosCopy.filter(todo => todo.completed);
          break;
        case 'active':
          todosCopy = todosCopy.filter(todo => !todo.completed);
          break;
        default:
          break;
      }

      if (query) {
        todosCopy = todosCopy.filter(todo => (
          todo.title.toLowerCase().includes(query.toLowerCase())
        ));
      }
    }

    return todosCopy;
  }, [todos, query, filter]);

  const handleSelectTodo = (todo: Todo) => () => {
    setSelectedTodo(todo);
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleSelectFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const value = useMemo(() => ({
    todos,
    visibleTodos,
    filter,
    handleSelectFilter,
    query,
    handleQueryChange,
    selectedTodo,
    handleSelectTodo,
    handleClose,
  }), [todos, visibleTodos, query, filter, selectedTodo]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
