/* eslint-disable max-len */
import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

const debounce = (
  fn: React.Dispatch<React.SetStateAction<string>>,
  delay: number,
) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(fn, delay, ...args);
  };
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [applyedQuery, setApplyedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todo, setTodo] = useState<null | Todo>(null);

  const getTodosFromServer = async () => {
    try {
      setIsLoading(true);
      const result = await getTodos();

      setTodos(result);
    } catch (error: unknown) {
      // eslint-disable-next-line no-alert
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const applyQuery = useCallback(
    debounce(setApplyedQuery, 500),
    [],
  );

  const getSortedTodos = () => {
    const filteredByQuery = todos.filter(({ title }) => (
      title.toLowerCase().includes(applyedQuery.toLowerCase())
    ));

    switch (status) {
      case 'active':
        return filteredByQuery.filter(({ completed }) => !completed);

      case 'completed':
        return filteredByQuery.filter(({ completed }) => completed);

      default:
        return filteredByQuery;
    }
  };

  const closeModal = () => setTodo(null);

  const visibleTodos = useMemo(
    getSortedTodos,
    [todos, status, applyedQuery],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                onChangeStatus={setStatus}
                onChangeQuery={setQuery}
                onChangeApplyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    onClick={setTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>
      {todo && (
        <TodoModal
          closeModal={closeModal}
          todo={todo}
        />
      )}
    </>
  );
};
