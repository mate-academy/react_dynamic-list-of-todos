import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoFilter } from './components/TodoFilter';
import { Filter } from './types/Filter';
import { filteredTodos } from './helpers';

// eslint-disable-next-line react/display-name
export const App: React.FC = React.memo(() => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoFilter, setTodoFilter] = useState(Filter.All);
  const [query, setQuery] = useState('');

  const loadTodos = () => {
    setIsLoading(true);
    setTodos([]);

    // Filter
    getTodos()
      .then(setTodos)
      .catch(() => {
        throw new Error('Could not fetch todos');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(loadTodos, [todoFilter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setTodoFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos(todos, query, todoFilter)}
                  selectedTodo={selectedTodo}
                  selectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setTodo={setSelectedTodo} />
      )}
    </>
  );
});
