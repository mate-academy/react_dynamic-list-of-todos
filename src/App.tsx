/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filters, TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<Filters>(Filters.all);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Try again later...'))
      .finally(() => setLoading(false));
  }, [updatedAt]);

  const handleCloseModal = useCallback(() => setSelectedTodo(null), []);

  const prepareTodos = useCallback((filter: Filters, query: string) => {
    let prepared = todos;

    if (filter !== Filters.all) {
      switch (filter) {
        case Filters.active:
          prepared = prepared.filter(todo => !todo.completed);
          break;

        case Filters.completed:
          prepared = prepared.filter(todo => todo.completed);
          break;

        default:
          break;
      }
    }

    if (query) {
      prepared = prepared.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return prepared;
  }, [todos]);

  const preparedTodos = useMemo(
    () => prepareTodos(filterBy, inputValue),
    [filterBy, inputValue, prepareTodos],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedValue={filterBy}
                selectFilter={setFilterBy}
                inputValue={inputValue}
                onInputChange={setInputValue}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {(!loading && todos.length > 0) && (
                <TodoList
                  todos={preparedTodos}
                  selected={selectedTodo}
                  onSelected={setSelectedTodo}
                />
              )}

              {errorMessage && (
                <p className="is-flex is-justify-content-space-between notification is-danger is-align-content-center">
                  {errorMessage}

                  <button
                    className={classNames('button', 'is-primary', 'is-pulled-right', '', {
                      'is-loading': loading,
                    })}
                    type="button"
                    onClick={() => setUpdatedAt(new Date())}
                  >
                    reload
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selected={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
