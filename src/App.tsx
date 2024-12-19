/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterSearchValue, setFilterSearchValue] = useState('');
  const [filterStatusValue, setFilterStatusValue] = useState('all');

  async function loadTodos() {
    try {
      const allTodos = await getTodos();

      setTodos(allTodos);
      setFilteredTodos(allTodos);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load todos', error);
    }

    setIsLoading(false);
  }

  function handleOpenModal(userId: number) {
    setSelectedUserId(userId);
    setIsModalOpen(!isModalOpen);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedTodo(null);
  }

  function handleSelectTodo(todoId: number) {
    const todo = todos.find(t => t.id === todoId);

    if (!todo) {
      return;
    }

    setSelectedTodo(todo);
  }

  function handleFilterStatusChange(
    event: React.ChangeEvent<HTMLSelectElement> | string,
  ) {
    const status = typeof event === 'string' ? event : event.target.value;

    if (status === 'all') {
      setFilteredTodos(todos);
    } else {
      const todosFilteredByStatus = todos.filter(todo => {
        return status === 'completed' ? todo.completed : !todo.completed;
      });

      setFilteredTodos(todosFilteredByStatus);
    }

    setFilterStatusValue(status);
  }

  function handleFilterSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchValueLowerCase = event.target.value.toLowerCase();

    const filteredTodosByText =
      filterStatusValue === 'all'
        ? todos.filter(todo => {
          const matchesText = todo.title
            .toLowerCase()
            .includes(searchValueLowerCase);

          return matchesText;
        })
        : todos.filter(todo => {
          const matchesText = todo.title.toLowerCase().includes(searchValueLowerCase);

          return (
            matchesText &&
              (filterStatusValue === 'completed'
                ? todo.completed
                : !todo.completed)
          );
        });

    setFilteredTodos(filteredTodosByText);
    setFilterSearchValue(event.target.value);
  }

  function handleCleanSearch() {
    setFilterSearchValue('');
    setFilterStatusValue('all');
    setFilteredTodos(todos);
  }

  useEffect(() => {
    loadTodos();
    setIsLoading(true);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  isShowClearButton={filterSearchValue.length > 0}
                  filterSearchValue={filterSearchValue}
                  filterStatusValue={filterStatusValue}
                  handleCleanSearch={handleCleanSearch}
                  handleFilterSearch={handleFilterSearch}
                  handleFilterStatusChange={handleFilterStatusChange}
                />
              </div>

              <div className="block">
                <TodoList
                  handleOpenModal={handleOpenModal}
                  todos={filteredTodos}
                  handleSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <TodoModal
          handleCloseModal={handleCloseModal}
          selectedUserId={selectedUserId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
