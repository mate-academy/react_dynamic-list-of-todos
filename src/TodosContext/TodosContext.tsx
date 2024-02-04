import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';
import { TODO_FOR_START } from '../variables/TODO_FOR_START';
import { TodosContext } from '../variables/TodosContext.1';
import { getFilteredTodos } from '../services/getFilteredTodos';

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [modaledTodo, setModaledTodo] = useState<Todo>(TODO_FOR_START);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const visibleTodos = getFilteredTodos(todos, query, status);

  const value = useMemo(() => ({
    todos,
    setTodos,
    query,
    setQuery,
    isModal,
    setIsModal,
    modaledTodo,
    setModaledTodo,
    visibleTodos,
    status,
    setStatus,
  }), [
    todos,
    query,
    modaledTodo,
    isModal,
    visibleTodos,
    setIsModal,
    status,
    setStatus,
  ]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
