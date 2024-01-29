import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

interface TodoContext {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  isModal: boolean,
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>,
  modaledTodo: Todo,
  setModaledTodo: React.Dispatch<React.SetStateAction<Todo>>,
  status: string,
  setStatus: React.Dispatch<React.SetStateAction<string>>,
  visibleTodos: Todo[],
}

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TODO_FOR_START = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  setTodos: () => { },
  query: '',
  setQuery: () => { },
  isModal: false,
  setIsModal: () => { },
  modaledTodo: TODO_FOR_START,
  setModaledTodo: () => { },
  status: '',
  setStatus: () => { },
  visibleTodos: [],
});

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

  function getFilteredTodos() {
    let todosFilter = todos.filter(todo => {
      switch (status) {
        case Status.Active:
          return todo.completed === false;
        case Status.Completed:
          return todo.completed === true;
        default:
          return true;
      }
    });

    if (query) {
      todosFilter = todosFilter.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return todosFilter;
  }

  const visibleTodos = getFilteredTodos();

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
