/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos()
      .then(result => setVisibleTodos(result))
      .catch(error => {
        throw new Error(`Something was wrong ${error.mesaage}`);
      });
  }, []);

  const filteredTodos = visibleTodos
    .filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()))
    .filter(({ completed }) => {
      if (filter === 'active') {
        return completed === false;
      }

      if (filter === 'completed') {
        return completed === true;
      }

      return true;
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
                setQuery={((chars) => setQuery(chars))}
                filter={filter}
                setFilter={(category) => setFilter(category)}
              />
            </div>

            <div className="block">
              {visibleTodos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    visibleTodos={filteredTodos}
                    setSelectedTodo={(todo) => setSelectedTodo(todo)}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={(todo) => setSelectedTodo(todo)}
        />
      )}
    </>
  );
};
