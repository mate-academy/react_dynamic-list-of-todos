/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then((todosData) => {
        setTodos(todosData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTodos = todos.filter((todo) => {
    const statusMatch = filterStatus === FilterStatus.All
    || (filterStatus === FilterStatus.Active && !todo.completed)
    || (filterStatus === FilterStatus.Completed && todo.completed);

    const searchMatch = searchTerm
      ? todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return statusMatch && searchMatch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>

            <div className="block">
              {loading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
