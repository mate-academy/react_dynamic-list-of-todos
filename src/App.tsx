/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodosFilter } from './types/TodosFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState(TodosFilter.ALL);
  const [query, setQuery] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos();

      setIsLoading(false);
      setTodos(todosFromServer);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const openModal = useCallback((todo: Todo, userId: number) => {
    setIsModalOpen(true);
    getUser(userId).then((user) => setSelectedUser(user));
    setSelectedTodo(todo);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setSelectedUser(null);
  }, []);

  const filteredTodos = todos.filter(todo => {
    const inputFilter = todo.title.toLowerCase().includes(query.toLowerCase().trim());

    switch (filter) {
      case TodosFilter.COMPLETED:
        return todo.completed && inputFilter;
      case TodosFilter.ACTIVE:
        return !todo.completed && inputFilter;
      default:
        return inputFilter;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            { isLoading && <Loader /> }
            { isError && <p className="has-text-danger">Something went wrong...</p> }
            { !isLoading && !isError && (
              <TodoList
                todos={filteredTodos}
                openModal={openModal}
                selectedTodo={selectedTodo}
              />
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
