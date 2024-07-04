import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadTodos = async () => {
    setIsLoading(true);
    const todosData = await getTodos();

    setTodos(todosData);
    setIsLoading(false);
  };

  const filterTodos = useCallback(() => {
    let filtered = todos;

    if (filterStatus === 'completed') {
      filtered = todos.filter(todo => todo.completed);
    } else if (filterStatus === 'active') {
      filtered = todos.filter(todo => !todo.completed);
    }

    if (searchQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  }, [todos, filterStatus, searchQuery]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    filterTodos();
  }, [todos, filterStatus, searchQuery, filterTodos]);

  const handleSelectTodo = async (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleDeselectTodo = () => {
    setSelectedTodo(null);
  };

  const handleCloseModal = () => {
    handleDeselectTodo();
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={handleSelectTodo}
                  onDeselectTodo={handleDeselectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}

      {isLoading && selectedTodo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" onClick={handleCloseModal} />
          <div className="modal-card">
            <Loader />
          </div>
        </div>
      )}
    </>
  );
};
