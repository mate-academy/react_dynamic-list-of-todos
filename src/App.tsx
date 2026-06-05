/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [todoModal, setTodoModal] = React.useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const [filterStatus, setFilterStatus] = useState('all');
  const [query, setQuery] = useState('');

  const visibleTodos = todos
    .filter(todo => {
      if (filterStatus === 'active') {
        return !todo.completed;
      }

      if (filterStatus === 'completed') {
        return todo.completed;
      }

      return true;
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
                query={query}
                onQueryChange={setQuery}
                filterStatus={filterStatus}
                onFilterStatusChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onTodoSelect={setTodoModal}
                selectedTodoId={todoModal?.id}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={todoModal} onTodoClose={() => setTodoModal(null)} />
    </>
  );
};
