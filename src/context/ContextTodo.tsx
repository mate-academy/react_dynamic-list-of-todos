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
  isOpenModal: boolean;
  selectedTodo: Todo | null;
  setSelectedTodo: (newTodo: Todo | null) => void
  setIsOpenModal: (newValue: boolean) => void;
  setFilteredBy: (newValue: ETodoStatus) => void;
  setInputField: (newValues: string) => void;
  setTodos: (newValues: Todo[]) => void;
}

const initialContext: IContextInitial = {
  todos: [],
  inputField: '',
  filteredBy: ETodoStatus.ALL,
  isOpenModal: false,
  selectedTodo: null,
  setSelectedTodo: () => { },
  setIsOpenModal: () => { },
  setFilteredBy: () => { },
  setInputField: () => { },
  setTodos: () => { },
};

export const TodoContext = createContext(initialContext);

export const ContextTodo: FC<TContextTodoProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputField, setInputField] = useState('');
  const [filteredBy, setFilteredBy] = useState(ETodoStatus.ALL);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const initialValueDeps = [
    todos,
    inputField,
    filteredBy,
    isOpenModal,
    selectedTodo,
  ];

  const initialValue = useMemo(() => ({
    todos,
    inputField,
    isOpenModal,
    selectedTodo,
    filteredBy,
    setSelectedTodo,
    setTodos,
    setInputField,
    setIsOpenModal,
    setFilteredBy,
  }), initialValueDeps);

  return (
    <TodoContext.Provider value={initialValue}>
      {children}
    </TodoContext.Provider>
  );
};
