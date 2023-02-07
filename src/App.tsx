/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(allTodos => {
      setIsLoading(false);
      setTodos(allTodos);
    });
  }, []);

  const reset = useCallback(() => {
    setQuery('');
  }, []);

  const showModal = useCallback(
    (todo: Todo) => {
      setSelectedTodo(todo);
    },
    [],
  );

  const hideModal = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = todos.filter(todo => {
    const isInclude = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (selectFilter) {
      case 'all':
        return isInclude;

      case 'active':
        return !todo.completed && isInclude;

      case 'completed':
        return todo.completed && isInclude;

      default:
        throw new Error('error!');
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
                reset={reset}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
            </div>

            <div className="block">
              { isLoading
                ? <Loader />
                : <TodoList todos={visibleTodos} selectedTodo={selectedTodo} onClick={showModal} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={hideModal} />}
    </>
  );
};
