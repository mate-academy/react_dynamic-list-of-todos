/* eslint-disable max-len */
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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
        setFilteredTodos(loadedTodos);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseTodo = () => {
    setSelectedTodo(null);
  };

  const handleFilterChange = (filter: string) => {
    const filtered = todos.filter(todo => {
      switch (filter) {
        case 'all':
          return true;
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return true;
      }
    });

    setFilteredTodos(filtered);
  };

  const handleSearch = (query: string) => {
    const searched = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredTodos(searched);
  };

  const handleClearSearch = () => {
    setFilteredTodos(todos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseTodo} />
      )}
    </>
  );
};
