/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [toDos, setToDos] = useState<Todo[]>([]);
  const [filteredToDos, setFilteredToDos] = useState<Todo[]>([]);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const selectedTodo = selectedTodoId
    ? toDos.find(todo => todo.id === selectedTodoId)
    : null;

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    getTodos()
      .then(data => {
        setToDos(data);
        setFilteredToDos(data);
      })
      .catch(() => setErrorMessage('Failed to fetch Todos'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    switch (status) {
      case 'all':
        setFilteredToDos(toDos);
        break;
      case 'active':
        setFilteredToDos(toDos.filter(todo => todo.completed === false));
        break;
      case 'completed':
        setFilteredToDos(toDos.filter(todo => todo.completed === true));
        break;
    }

    if (query) {
      setFilteredToDos(current =>
        current.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
  }, [query, status, toDos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onQueryChanged={setQuery}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              <div data-cy="error">{errorMessage}</div>
              {isLoading && <Loader />}
              {!errorMessage && !isLoading && (
                <TodoList
                  toDos={filteredToDos}
                  onSelect={setSelectedTodoId}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCancel={() => setSelectedTodoId(null)}
        />
      )}
    </>
  );
};
