import { createContext, useMemo, useState } from 'react';
import { TodoContext } from '../types/TodoContext';
import { Todo } from '../types/Todo';

export const defaultTodo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

export const TodosContext = createContext<TodoContext>({
  show: false,
  setShow: () => {},
  selectedTodo: defaultTodo,
  setSelectedTodo: () => {},
  filterField: 'All',
  setFilterField: () => {},
  query: '',
  setQuery: () => {},
});

interface Props {
  children: React.ReactNode
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(defaultTodo);
  const [filterField, setFilterField] = useState('All');
  const [query, setQuery] = useState('');

  const preparedValue = useMemo(() => ({
    show,
    setShow,
    selectedTodo,
    setSelectedTodo,
    filterField,
    setFilterField,
    query,
    setQuery,
  }), [filterField, show, selectedTodo, query]);

  return (
    <TodosContext.Provider value={preparedValue}>
      {children}
    </TodosContext.Provider>
  );
};
