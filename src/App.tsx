/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.all);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                onQueryChange={setQuery}
                onSelect={setStatus}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={todos}
                    query={query}
                    selctedTodo={selectedTodo}
                    selectedOption={status}
                    onTodoSelected={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onModalClose={setSelectedTodo}
        />
      )}
    </>
  );
};
