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
  const [todoData, setTodoData] = useState<Todo[] | null>(null);
  const [preparedData, setPreparedData] = useState<Todo[] | null>(null);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodoData)
      .then(() => setPreparedData(todoData))
      .catch(error => setErrorMessage(error.message))
      .finally(() => {
        setLoading(false);
      });
  }, [todoData]);

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
              {errorMessage}
              {loading && !errorMessage ? (
                <>
                  <Loader />
                  <article className="message is-danger">
                    <div className="message-body">{errorMessage}</div>
                  </article>
                </>
              ) : (
                <TodoList
                  todoData={preparedData || []}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  setSelectedUserId={setSelectedUserId}
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
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
      )}
    </>
  );
};
