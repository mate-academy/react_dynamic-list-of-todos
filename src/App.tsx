/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import TodoList from './components/TodoList/TodoList';
import TodoFilter from './components/TodoFilter/TodoFilter';
import TodoModal from './components/TodoModal/TodoModal';
import { Loader } from './components/Loader';
import { Todo, TodoStatus } from './types/Todo';
import { getTodos } from './api';
import { getFilteredTodos } from './utils/todoUtils';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [filterMethod, setFilterMethod] = useState(TodoStatus.Default);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setErrMsg('Sth went wrong. Please try later. '))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const onSelect = useCallback((method: TodoStatus) => {
    setFilterMethod(method);
  }, []);

  const onQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery.trim());
  }, []);

  const onSelectTodo = useCallback(
    (id: number) => {
      if (selectedTodo?.id !== id) {
        setSelectedTodo(todos.find(todo => todo.id === id));
      }
    },
    [todos, selectedTodo?.id],
  );

  const onUnselectTodo = useCallback(() => setSelectedTodo(undefined), []);

  const filteredTodos = getFilteredTodos(todos, filterMethod, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelect={onSelect} onQueryChange={onQueryChange} />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={onSelectTodo}
                />
              )}
              {errMsg && <p>{errMsg}</p>}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onUnselectTodo={onUnselectTodo} />
      )}
    </>
  );
};
