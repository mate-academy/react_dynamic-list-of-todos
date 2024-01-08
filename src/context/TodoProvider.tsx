import {
  FC, ReactNode, createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

type Props = {
  children: ReactNode,
};

type TodoProviderT = {
  isPressed: boolean,
  setIsPressed: React.Dispatch<React.SetStateAction<boolean>>,
  activeTodo: Todo | null,
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  isModalLoading: boolean,
  setIsModalLoading: React.Dispatch<React.SetStateAction<boolean>>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  visibleTodos: Todo[],
  option: string,
  setOption: React.Dispatch<React.SetStateAction<string>>,
};

const TodoContext = createContext<TodoProviderT>({
  isPressed: false,
  setIsPressed: () => {},
  activeTodo: null,
  setActiveTodo: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isModalLoading: false,
  setIsModalLoading: () => {},
  todos: [],
  setTodos: () => {},
  query: '',
  setQuery: () => {},
  visibleTodos: [],
  option: 'all',
  setOption: () => {},
});

const TodoProvider: FC<Props> = ({ children }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('all');

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(data => {
      setTodos(data);
      setIsLoading(false);
    });
  }, []);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()))
      .filter(todo => {
        switch (option) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return todo;
        }
      });
  }, [query, todos, option]);

  const value = useMemo(() => ({
    isPressed,
    setIsPressed,
    activeTodo,
    setActiveTodo,
    isLoading,
    setIsLoading,
    isModalLoading,
    setIsModalLoading,
    todos,
    setTodos,
    query,
    setQuery,
    visibleTodos,
    option,
    setOption,
  }), [
    isPressed,
    activeTodo,
    isLoading,
    todos,
    query,
    visibleTodos,
    option,
    isModalLoading]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;

export const useTodos = () => useContext(TodoContext);
