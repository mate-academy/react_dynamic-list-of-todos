/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [preparedTodos, setPreparedTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setPreparedTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setDataLoaded(false);
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setSelectedUser)
        .finally(() => setDataLoaded(true));
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={selectedStatus}
                onSelectStatus={setSelectedStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={preparedTodos}
                onSelect={setSelectedTodo}
                selectedTodo={selectedTodo}
                status={selectedStatus}
                query={query}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          onClose={setSelectedTodo}
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          dataLoaded={dataLoaded}
        />
      )}
    </>
  );
};
