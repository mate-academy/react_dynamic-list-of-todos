/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredStatus, setFilteredStatus] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const resetSelect = () => {
    setSelectedTodo(null);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const statusCondition =
        filteredStatus === 'all' ||
        (filteredStatus === 'completed' && todo.completed) ||
        (filteredStatus === 'active' && !todo.completed);

      const queryCondition = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return statusCondition && queryCondition;
    });
  }, [query, todos, filteredStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={query}
                status={filteredStatus}
                onValue={value => setQuery(value)}
                onStatus={value => setFilteredStatus(value)}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selected={selectedTodo}
                  onSelected={todo => setSelectedTodo(todo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal userPost={selectedTodo} onReset={resetSelect} />
      )}
    </>
  );
};
