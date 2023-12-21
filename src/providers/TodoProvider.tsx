import {
  createContext, FC, useCallback, useContext, useEffect, useMemo, useState,
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
    getTodos()
      .then(setTodos)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(error);
      });
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

  const handleSelectTodo = useCallback((todo: Todo) => () => {
    setSelectedTodo(todo);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleSelectFilter = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

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
  }), [todos, visibleTodos, query, filter, selectedTodo,
    handleSelectTodo, handleSelectFilter, handleQueryChange, handleClose]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
