import {
  FC,
  ReactNode,
  createContext,
  useMemo,
  useState,
} from 'react';

import { ETodoStatus, Todo } from '../types/Todo';

type TContextTodoProps = {
  children: ReactNode;
};

interface IContextInitial {
  todos: Todo[];
  inputField: string;
  filteredBy: ETodoStatus;
  isModalOpen: boolean;
  selectedTodo: Todo | null;
  setSelectedTodo: (newTodo: Todo | null) => void
  setIsModalOpen: (newValue: boolean) => void;
  setFilteredBy: (newValue: ETodoStatus) => void;
  setInputField: (newValues: string) => void;
  setTodos: (newValues: Todo[]) => void;
}

const initialContext: IContextInitial = {
  todos: [],
  inputField: '',
  filteredBy: ETodoStatus.ALL,
  isModalOpen: false,
  selectedTodo: null,
  setSelectedTodo: () => { },
  setIsModalOpen: () => { },
  setFilteredBy: () => { },
  setInputField: () => { },
  setTodos: () => { },
};

export const TodoContext = createContext(initialContext);

export const ContextTodo: FC<TContextTodoProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputField, setInputField] = useState('');
  const [filteredBy, setFilteredBy] = useState(ETodoStatus.ALL);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const initialValueDeps = [
    todos,
    inputField,
    filteredBy,
    isModalOpen,
    selectedTodo,
  ];

  const initialValue = useMemo(() => ({
    todos,
    inputField,
    isModalOpen,
    selectedTodo,
    filteredBy,
    setSelectedTodo,
    setTodos,
    setInputField,
    setIsModalOpen,
    setFilteredBy,
  }), initialValueDeps);

  return (
    <TodoContext.Provider value={initialValue}>
      {children}
    </TodoContext.Provider>
  );
};
