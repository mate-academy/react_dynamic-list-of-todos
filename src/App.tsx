/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              <TodoList filter={filter} filterStatus={filterStatus} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
