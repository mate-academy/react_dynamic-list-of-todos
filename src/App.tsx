/* eslint-disable max-len */
import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todosToUse, setTodosToUse] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getTodos()
  //     .then((todos) => setTodosToUse(todos));
  //     .catch(() => setHasError(true))
  // }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setLoading(false);
        setTodosToUse(todosFromServer);
      } catch (error) {
        setHasError(true);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    return todosToUse.filter((todo) => {
      const filteredByQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (selectFilter) {
        case 'active':
          return !todo.completed && filteredByQuery;

        case 'completed':
          return todo.completed && filteredByQuery;

        case 'all':
        default:
          return filteredByQuery;
      }
    });
  }, [selectFilter, todosToUse, query]);

  const onChangedQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    }, [],
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
                onChangedQuery={onChangedQuery}
                resetQuery={reset}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
            </div>

            {hasError
              ? <span>No todos from server</span>
              : (
                <div className="block">
                  {loading
                    ? <Loader />
                    : (
                      <TodoList
                        todos={filteredTodos}
                        selectedTodo={selectedTodo}
                        setSelectedTodo={setSelectedTodo}
                      />
                    )}
                </div>
              )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
