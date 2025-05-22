/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoState } from './types/Todo';

export const App: React.FC = () => {
  const [styleFilter, setStyleFilter] = useState<TodoState>(TodoState.All);
  const [inputSearch, setInputSearch] = useState('');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                styleFilter={styleFilter}
                setStyleFilter={setStyleFilter}
                setInputSearch={setInputSearch}
              />
            </div>

            <div className="block">
              <TodoList styleFilter={styleFilter} inputSearch={inputSearch} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
