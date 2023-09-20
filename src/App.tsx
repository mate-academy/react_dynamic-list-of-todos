/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [handleClose, setHandle] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filter, setFilter] = useState('all');

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} setFilter={setFilter} setSearchText={setSearchText} searchText={searchText} />
            </div>

            <div className="block">
              {loading ? <Loader /> : <TodoList searchText={searchText} filter={filter} setHandle={setHandle} setSelectedTodo={setSelectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {handleClose && <TodoModal setHandle={setHandle} todo={selectedTodo} />}
    </>
  );
};
