/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [hasError, setHasError] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const loadTodos = async () => {
    try {
      const response = await getTodos();

      setTodos(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console

      setHasError(true);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const visibleTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return false;
    }
  }).filter((todo) => {
    const title = todo.title.toLowerCase();
    const formattedQuery = query.toLowerCase();

    return title.includes(formattedQuery);
  });

  return (
    <>
      {
        hasError
          ? (<p> Something went wrong</p>)
          : (
            <>
              <div className="section">
                <div className="container">
                  <div className="box">
                    <h1 className="title">Todos:</h1>

                    <div className="block">
                      <TodoFilter
                        query={query}
                        filter={filter}
                        onQueryChange={handleQueryChange}
                        onFilterChange={handleFilterChange}

                      />
                    </div>

                    <div className="block">
                      {isLoading
                        ? <Loader />
                        : (
                          <TodoList
                            visibleTodos={visibleTodos}
                            selectedTodo={selectedTodo}
                            onTodoSelect={handleTodoSelect}
                          />
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {selectedTodo && (
                <TodoModal
                  selectedTodo={selectedTodo}
                  onClose={handleModalClose}
                />
              )}
            </>
          )
      }
    </>
  );
};
