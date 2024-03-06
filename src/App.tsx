/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getFilteredTodos } from './taskFilter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[] | null>(null);
  const [mode, setMode] = useState('all');
  const [search, setSearch] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [taskInfo, settaskInfo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setisLoading(true);
    getTodos()
      .then(setTasks)
      .catch(() => setErrorMessage('Try Again Later'))
      .finally(() => setisLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(tasks, mode, search);

  const onClose = () => {
    settaskInfo(null);
  };

  const onActive: (task: Todo) => void = task => {
    settaskInfo(task);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setMode={setMode}
                setSearch={setSearch}
                search={search}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && !errorMessage && (
                <TodoList
                  tasks={filteredTodos || []}
                  selectTask={onActive}
                  taskinfo={taskInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {taskInfo && <TodoModal onClose={onClose} taskInfo={taskInfo} />}
    </>
  );
};
