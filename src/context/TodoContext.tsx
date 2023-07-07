import { createContext, useEffect, useState } from 'react';
import { getTodos, getUser } from '../api';
import { Todo, TodoStatus } from '../types/Todo';

interface ProvidedValue {
  todos: Todo[],
  isLoading: boolean,
  selectedTodo: Todo | null,
  showModal: boolean,
  isUserPending: boolean,
  filterTodosByField: ({ query, status }: FilterOptions) => void,
  onSelect: (todo: Todo) => void,
  closeModalWindow: () => void,
}

type Props = {
  children: React.ReactNode,
};

type FilterOptions = {
  status: string,
  query: string,
};

export const TodoContext = createContext({} as ProvidedValue);

export const TodoContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [todosContainer, setTodosContainer] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isUserPending, setIsUserPending] = useState(false);

  const fetchTodos = async () => {
    setIsLoading(true);
    await getTodos().then((res) => {
      setTodos(res);
      setTodosContainer(res);
      setIsLoading(false);
    });
  };

  const filterTodosByField = ({ query, status }: FilterOptions) => {
    let filtered = [...todosContainer];

    if (query) {
      const normalizedQuery = query.toLowerCase();

      filtered = filtered.filter(todo => {
        return todo.title.toLowerCase().includes(normalizedQuery);
      });
    }

    if (status) {
      filtered = filtered.filter(todo => {
        switch (status) {
          case TodoStatus.Active:
            return !todo.completed;
          case TodoStatus.Completed:
            return todo.completed;
          default:
            return todo;
        }
      });
    }

    setTodos(filtered);
  };

  const handleSelectTodo = (todo: Todo) => {
    setShowModal(true);
    setIsUserPending(true);
    getUser(todo.userId)
      .then((res) => setSelectedTodo({ ...todo, user: res }))
      .then(() => setIsUserPending(false));
  };

  const closeModalWindow = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const providingValues = {
    todos,
    isLoading,
    selectedTodo,
    showModal,
    isUserPending,
    filterTodosByField,
    onSelect: handleSelectTodo,
    closeModalWindow,
  };

  return (
    <TodoContext.Provider value={providingValues}>
      {children}
    </TodoContext.Provider>
  );
};
