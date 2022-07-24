/* eslint-disable max-len */
import React from 'react';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { TodoFilter } from './components/TodosFilter';

const App: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList />
              </div>
            </div>
          </div>

          <div className="column is-4 is-3-desktop">
            <div className="box has-background-grey-dark has-text-white has-text-weight-bold">
              User not selected
            </div>
            <CurrentUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
