/* eslint-disable max-len */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, ActiveSelector } from './types/Types';
import { QueryContext, UserIdContext } from './util/Store';
import { filteredTodos } from './util/utils';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSelector, setActiveSelector] = useState<string>(
    ActiveSelector.All,
  );
  const { query } = useContext(QueryContext);
  const { activeUser } = useContext(UserIdContext);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const preparedList = useMemo(() => {
    return filteredTodos(todos, activeSelector, query);
  }, [todos, activeSelector, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                acitveSelector={activeSelector}
                setActiveSelector={setActiveSelector}
              />
            </div>

            <div className="block">
              {loading ? <Loader /> : <TodoList todos={preparedList} />}
            </div>
          </div>
        </div>
      </div>

      {activeUser && <TodoModal />}
    </>
  );
};
