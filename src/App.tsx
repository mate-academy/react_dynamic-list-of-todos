/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [todoData, setTodoData] = useState<Todo[]>([]);
  const [preparedData, setPreparedData] = useState<Todo[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  // const [selectedUserId, setSelectedUserId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setTodoData(fetchedTodos);
        setPreparedData(fetchedTodos);
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todoData={todoData}
                setPreparedData={setPreparedData}
              />
            </div>

            <div className="block">
              {errorMessage && (
                <article className="message is-danger">
                  <div className="message-body">{errorMessage}</div>
                </article>
              )}
              {loading && !errorMessage && preparedData.length > 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todoData={preparedData || []}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedId && (
        <TodoModal
          todoData={todoData}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}
    </>
  );
};
