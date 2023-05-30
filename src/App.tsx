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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [queryFilter, setQueryFilter] = useState('');
  const [details, setDetails] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then((recievedTodos) => setTodos(recievedTodos));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setTaskStatusFilter={setStatusFilter}
                setQueryFilter={setQueryFilter}
              />
            </div>

            <div className="block">
              {
                todos.length
                  ? (
                    <TodoList
                      todos={todos}
                      isEyeOpenFor={details ? details.id : -1}
                      setDetails={setDetails}
                      queryFilter={queryFilter}
                      statusFilter={statusFilter}
                    />
                  )
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>

      {details && <TodoModal details={details} setDetails={setDetails} />}
    </>
  );
};
