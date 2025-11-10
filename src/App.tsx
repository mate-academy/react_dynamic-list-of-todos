/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                setIsLoading={setIsLoading}
                setSelectedTodo={setSelectedTodo}
                search={search}
                status={status}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
          userId={selectedTodo.userId}
          isLoading={modalLoading}
          setIsLoading={setModalLoading}
        />
      )}
    </>
  );
};
