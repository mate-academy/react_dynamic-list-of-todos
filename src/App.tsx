import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

const getPreparedTodos = (todos: Todo[], query: string, filterType: string) => {
  let copyTodos = [...todos];

  if (query) {
    copyTodos = copyTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.toLowerCase().includes(query.toLowerCase());
    });
  }

  copyTodos = copyTodos.filter(todo => {
    if (filterType === 'active') {
      return todo.completed === false;
    }

    if (filterType === 'completed') {
      return todo.completed === true;
    }

    return todo;
  });

  return copyTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaderShown, setIsLoaderShown] = useState(true);
  const [isClickedId, setIsClickedId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const preparedTodos = getPreparedTodos(todos, query, filterType);

  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data);
      setIsLoaderShown(false);
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
                query={query}
                setQuery={setQuery}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoaderShown ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  isClickedId={isClickedId}
                  setIsClickedId={(id) => setIsClickedId(id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isClickedId && (
        <TodoModal
          setIsClickedId={(id) => setIsClickedId(id)}
          todos={preparedTodos}
          isClickedId={isClickedId}
        />
      )}
    </>
  );
};
