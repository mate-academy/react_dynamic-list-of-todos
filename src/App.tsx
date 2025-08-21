import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setFetchError('Failed to load todos from the server.'))
      .finally(() => setLoading(false));
  }, []);

  const openTodoDetails = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeTodoDetails = () => {
    setSelectedTodo(null);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getFilteredTodos = (): Todo[] => {
    let filteredTodos = [...todos];

    if (searchQuery.trim() !== '') {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      );
    }

    if (filterStatus === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (filterStatus === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    return filteredTodos;
  };

  const visibleTodos = getFilteredTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todo List</h1>

            <div className="block">
              <TodoFilter
                onClearSearch={handleClearSearch}
                onSearchChange={setSearchQuery}
                searchQuery={searchQuery}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && fetchError && <p className="has-text-danger">{fetchError}</p>}
              {!loading && !fetchError && (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={openTodoDetails}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={closeTodoDetails}
        />
      )}
    </>
  );
};