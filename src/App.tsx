/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { filterTodos } from './utils/filterTodos';
import { FilterConfig } from './types/FilterConfig';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    filterOption: 'all',
    query: '',
  });
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const filteredTodos = filterTodos(todos, filterConfig);

  useEffect(() => {
    setError('');
    setIsLoading(true);
    setTodos([]);

    getTodos()
      .then(setTodos)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterConfig={filterConfig}
                setFilterConfig={setFilterConfig}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <TodoList
                  selectedTodo={selectedTodo}
                  onTodoSelect={setSelectedTodo}
                  todos={filteredTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onModalClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
