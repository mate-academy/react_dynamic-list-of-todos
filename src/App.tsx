/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [chosenTodo, setChosenTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setVisibleTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = visibleTodos
    .filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
        case 'all':
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={setStatus}
                onInput={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onChoose={setChosenTodo}
                  chosenTodo={chosenTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {chosenTodo && <TodoModal todo={chosenTodo} onClear={setChosenTodo} />}
    </>
  );
};
