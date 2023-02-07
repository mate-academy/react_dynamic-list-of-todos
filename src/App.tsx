/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
}
  from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [selectedToDo, setSelectedToDo] = useState<Todo | null>(null);
  const [visibleToDos, setVisibleToDos] = useState<Todo[]>([]);

  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then((todos) => setVisibleToDos(todos));
  }, []);

  const filteredTodos = useMemo(() => {
    return visibleToDos.filter((todo) => {
      const filteredByQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (status) {
        case 'active':
          return !todo.completed && filteredByQuery;

        case 'completed':
          return todo.completed && filteredByQuery;

        case 'all':
        default:
          return filteredByQuery;
      }
    });
  }, [status, visibleToDos, query]);

  const onQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const reset = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={onQueryChange}
                resetQuery={reset}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {!visibleToDos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedToDo}
                  setSelectedTodo={setSelectedToDo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedToDo && (
        <TodoModal
          selectedTodo={selectedToDo}
          setSelectedTodo={setSelectedToDo}
        />
      )}
    </>
  );
};
