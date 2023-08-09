import React, { useMemo, useState } from 'react';
import { Sort } from './types/Sort';
import { Todo } from './types/Todo';

type State = {
  setSelectedTodo: (todo: Todo | null) => void;
  setSortMode: (value: Sort) => void;
  setIsTodoModal: (value: boolean) => void;
  setModalId: (value: number) => void;
  sortMode: Sort;
  isTodoModal: boolean;
  modalId: number | null;
  selectedTodo: Todo | null;
};

const initialData: State = {
  setSelectedTodo: () => {},
  setSortMode: () => {},
  setIsTodoModal: () => {},
  setModalId: () => {},
  sortMode: Sort.all,
  isTodoModal: false,
  modalId: null,
  selectedTodo: null,
};

export const TodosContext = React.createContext(initialData);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sortMode, setSortMode] = useState(Sort.all);
  const [isTodoModal, setIsTodoModal] = useState(false);
  const [modalId, setModalId] = useState<number | null>(null);

  const data = useMemo(() => ({
    setSortMode,
    setIsTodoModal,
    setModalId,
    setSelectedTodo,
    sortMode,
    isTodoModal,
    modalId,
    selectedTodo,
  }), [sortMode, modalId, selectedTodo, isTodoModal]);

  return (
    <TodosContext.Provider value={data}>
      {children}
    </TodosContext.Provider>
  );
};
