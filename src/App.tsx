/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [sortType, setSorttype] = useState('all');
  const [query, setQuery] = useState('');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSortType={setSorttype}
                setQuery={setQuery}
                query={query}
                sortType={sortType}
              />
            </div>

            <div className="block">
              <TodoList sortType={sortType} query={query} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
