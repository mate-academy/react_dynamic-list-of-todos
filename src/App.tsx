import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterName, setFilterName] = useState('');
  const [applyQuery, setApplyQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleSetFilterName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterName(event.target.value);
  };

  const handleSetSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setApplyQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
    setApplyQuery('');
  };

  const getCorrectTodos = () => {
    let filteredTodos = [...todos];

    if (filterName === 'active' || filterName === 'completed') {
      filteredTodos = todos.filter(({ completed }) => {
        if (filterName === 'active') {
          return !completed;
        } else {
          return completed;
        }
      });
    }

    if (applyQuery) {
      filteredTodos = filteredTodos.filter(({ title }) =>
        title.toLocaleLowerCase().includes(applyQuery.toLocaleLowerCase()),
      );
    }

    return filteredTodos;
  };

  const correctTodos = getCorrectTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                onSetFilterName={handleSetFilterName}
                onSetSearch={handleSetSearch}
                clearInput={handleClear}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={correctTodos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
