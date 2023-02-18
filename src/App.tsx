/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { debounce } from 'lodash';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>(FilterType.All);
  const [apllyQuery, setApllyQuery] = useState('');
  const [handleError, setHandleError] = useState(false);

  let visibleTodos = todos.filter(todo => {
    switch (status) {
      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  const selectedTodo = useMemo(() => {
    return todos.find(
      todo => todo.id === selectedTodoId,
    );
  }, [selectedTodoId, todos]);

  const lowQuery = apllyQuery.toLowerCase();

  const isMatchingTodos = (!query)
    ? <Loader />
    : <p>Nothing is matching</p>;

  const selectTodo = (id: number) => (
    (selectedTodoId !== id)
      ? setSelectedTodoId(id)

      : setSelectedTodoId(0)
  );

  const fetchTodos = async () => {
    try {
      const todoFromServer = await getTodos();

      setTodos(todoFromServer);
    } catch (error) {
      setHandleError(true);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const debouncedChangeHandler = useCallback(
    debounce(setApllyQuery, 1000),
    [],
  );

  if (apllyQuery) {
    visibleTodos = visibleTodos.filter(todo => {
      return todo.title.toLowerCase().includes(lowQuery);
    });
  }

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
                status={status}
                setStatus={setStatus}
                debounceQuery={debouncedChangeHandler}
              />
            </div>

            <div className="block">
              {handleError
              && (<p>No server response</p>)}

              {visibleTodos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={selectTodo}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : (isMatchingTodos)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            selectTodo={selectTodo}
          />
        )}
    </>
  );
};
