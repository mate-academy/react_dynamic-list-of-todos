/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [filterBy, setFilterBy] = useState<Filter>('all');
  const [query, setQuery] = useState<string>('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<null | number>(null);
  const [firstRendering, setFirstRendering] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(todos => {
        let list: Todo[] = [];

        switch (filterBy) {
          case 'active':
            list = todos.filter(todo => !todo.completed);
            break;
          case 'completed':
            list = todos.filter(todo => todo.completed);
            break;
          case 'all':
          default:
            list = todos;
        }

        if (query) {
          list = list.filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
        }

        setVisibleTodos(list);
        setFirstRendering(false);
      })
      .catch(setError);
  }, [filterBy, query]);

  const getTodoById = useCallback(
    (id: number): Todo | null => {
      return visibleTodos.find(todo => todo.id === id) || null;
    },
    [visibleTodos],
  );

  return (
    error || (
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  onFilter={setFilterBy}
                  onInput={setQuery}
                  value={query}
                />
              </div>

              <div className="block">
                {firstRendering ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    selected={selectedTodo}
                    onSelect={setSelectedTodo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {selectedTodo && (
          <TodoModal
            todo={getTodoById(selectedTodo)}
            onClose={setSelectedTodo}
            onError={setError}
            errorMessage={error}
          />
        )}
      </>
    )
  );
};
