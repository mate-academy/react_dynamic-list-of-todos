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
  selectedTodo: Todo | null;
  setSelectedTodo: (newTodo: Todo | null) => void
  setFilteredBy: (newValue: ETodoStatus) => void;
  setInputField: (newValues: string) => void;
  setTodos: (newValues: Todo[]) => void;
}

const initialContext: IContextInitial = {
  todos: [],
  inputField: '',
  filteredBy: ETodoStatus.All,
  selectedTodo: null,
  setSelectedTodo: () => { },
  setFilteredBy: () => { },
  setInputField: () => { },
  setTodos: () => { },
};

export const TodoContext = createContext(initialContext);

export const ContextTodo: FC<TContextTodoProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputField, setInputField] = useState('');
  const [filteredBy, setFilteredBy] = useState(ETodoStatus.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const initialValueDeps = [
    todos,
    inputField,
    filteredBy,
    selectedTodo,
  ];

  const initialValue = useMemo(() => ({
    todos,
    inputField,
    selectedTodo,
    filteredBy,
    setSelectedTodo,
    setTodos,
    setInputField,
    setFilteredBy,
  }), initialValueDeps);

  return (
    <TodoContext.Provider value={initialValue}>
      {children}
    </TodoContext.Provider>
  );
};
