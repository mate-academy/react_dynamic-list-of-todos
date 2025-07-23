import { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { FilterStatus } from '../../types/ToDoFilterProps';
// import { set } from 'cypress/types/lodash';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [query, setQuery] = useState<string>('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
        setFilteredTodos(loadedTodos);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsLoadingUser(true);

    getUser(selectedTodo.userId)
      .then((user: User) => {
        setSelectedUser(user);
      })
      .catch(() => {
        setSelectedUser(null);
      })
      .finally(() => setIsLoadingUser(false));
  }, [selectedTodo]);

  useEffect(() => {
    let result = [...todos];

    if (query) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (filterStatus === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (filterStatus === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    setFilteredTodos(result);
  }, [todos, query, filterStatus]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setSelectedTodoId(todo.id);
    setIsLoadingUser(true);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setIsLoadingUser(false);
    setSelectedTodoId(null);
    setIsModalOpen(false);
  };

  return {
    todos: filteredTodos,
    isLoading,
    isModalOpen,
    selectedTodo,
    selectedUser,
    selectedTodoId,
    isLoadingUser,
    filterStatus,
    query,
    setQuery,
    setFilterStatus,
    handleSelectTodo,
    handleCloseModal,
    setSelectedTodoId,
    setIsModalOpen,
  };
};
