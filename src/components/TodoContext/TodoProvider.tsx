import { createContext, FC, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Context {
  selectedTodo: Todo | null;
  setSelectedTodo:(value: Todo | null) => void;
}

export const TodoContext = createContext<Context>({
  selectedTodo: null,
  setSelectedTodo() {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: FC<Props> = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  return (
    <TodoContext.Provider value={{ selectedTodo, setSelectedTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
