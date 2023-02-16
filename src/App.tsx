/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { debounce } from 'lodash';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { getVisibleTodos } from './utils/getVisibleTodos';
import { SelectValue } from './types/SelectValue';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectValue, setSelectValue] = useState(SelectValue.ALL);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [hasError, setHasError] = useState(false);

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const clearInput = useCallback(() => {
    setQuery('');
    setAppliedQuery('');
  }, []);

  const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  }, []);

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, selectValue, appliedQuery);
  }, [selectValue, appliedQuery, todos]);

  const handleSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => setSelectValue(event.target.value as SelectValue), []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setLoading(false);
        setTodos(todosFromServer);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        setHasError(true);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const showModal = useCallback((todo: Todo) => setSelectedTodo(todo), []);
  const closeModal = useCallback(() => setSelectedTodo(null), []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSelect={handleSelect}
                query={query}
                handleInput={handleInput}
                clearInput={clearInput}
              />
            </div>

            {hasError
              ? <span> No todos from server</span>
              : (
                <div className="block">
                  {loading
                    ? <Loader />
                    : (
                      <TodoList
                        todos={visibleTodos}
                        showModal={showModal}
                        selectedTodo={selectedTodo}
                      />
                    )}
                </div>
              )}
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} closeModal={closeModal} />}
    </>
  );
};
