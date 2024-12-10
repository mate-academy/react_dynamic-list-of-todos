import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getTodos } from '../api';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

interface TodoContextProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalOpen: (id: number) => void;
  handleModalClose: () => void;
  selectedTodo: Todo | undefined;
  filteredTodos: Todo[];
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const allTodos = await getTodos();

      setTodos(allTodos);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  const handleModalOpen = (id: number) => {
    const uniqueTodo = todos.find(todo => todo.id === id);

    if (uniqueTodo) {
      setSelectedTodo(uniqueTodo);
    }

    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        loading,
        setLoading,
        modalOpen,
        setModalOpen,
        handleModalOpen,
        handleModalClose,
        selectedTodo,
        filteredTodos,

        users,
        setUsers,

        setFilteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
};
