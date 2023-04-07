/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { ShowType } from './components/TodoFilter/TodoFilter.types';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { Error } from './components/Error/Error';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<ShowType>(ShowType.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const getTodosFromServer = async () => {
    setIsLoading(true);

    try {
      const todos = await getTodos();

      setTodosFromServer(todos);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = useMemo(() => {
    const filterOptions = {
      [ShowType.All]: (todo: Todo) => Boolean(todo),
      [ShowType.Active]: (todo: Todo) => !todo.completed,
      [ShowType.Completed]: (todo: Todo) => todo.completed,
    };

    let filteredTodos = todosFromServer.filter(filterOptions[filterBy]);

    if (query) {
      filteredTodos = filteredTodos.filter(
        ({ title }) => title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      );
    }

    return filteredTodos;
  }, [filterBy, query, isLoading]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterBy={filterBy}
                onSelectChange={setFilterBy}
                onInputChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {visibleTodos.length > 0 && !hasError
                      ? (
                        <TodoList
                          todosFromServer={visibleTodos}
                          onTodoSelect={setSelectedTodo}
                          selectedTodo={selectedTodo}
                        />
                      )
                      : (
                        <p>
                          No todos found
                        </p>
                      )}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseButton={() => setSelectedTodo(null)}
        />
      )}

      {hasError && <Error />}
    </>
  );
};
