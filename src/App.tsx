import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SelectedType } from './types/SelectedType';

import { getFilteredData } from './utils/getFilteredData';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<SelectedType>(
    SelectedType.ALL,
  );

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredData = getFilteredData(todos, { query, selectedCondition });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                selectedCondition={selectedCondition}
                setSelectedCondition={setSelectedCondition}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList todos={filteredData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
