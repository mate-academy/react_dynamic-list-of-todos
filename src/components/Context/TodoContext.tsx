import React, { useState, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const TodosContext = React.createContext<{
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  selectedTodo: Todo | null,
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>,
  text: string,
  setText: React.Dispatch<React.SetStateAction<string>>,
}>({
  todos: [],
  setTodos: () => {},
  showModal: false,
  setShowModal: () => {},
  selectedTodo: null,
  setSelectedTodo: () => {},
  filter: Status.ALL,
  setFilter: () => {},
  text: '',
  setText: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<string>(Status.ALL);
  const [text, setText] = useState('');

  const value = useMemo(() => ({
    todos,
    setTodos,
    showModal,
    setShowModal,
    selectedTodo,
    setSelectedTodo,
    filter,
    setFilter,
    text,
    setText,
  }), [todos, showModal, selectedTodo, filter, text]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
