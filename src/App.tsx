/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { getVisibleTodos } from './getVisibleTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [status, setStatus] = useState('full');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(error => console.info(error));
  }, []);

  const handleSelectTodoId = useCallback((id: number) => {
    setSelectedTodoId(id);
  }, []);

  const handleChangeQuery = useCallback((value: string) => {
    setQuery(value);
  }, []);
  const handleDeleteQuery = useCallback(() => setQuery(''), []);

  const handleChangeStatus = useCallback((value : string) => setStatus(value), []);
  const handleCloseModal = useCallback(() => setSelectedTodoId(0), []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, query, status)
  ), [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuery={handleChangeQuery}
                onStatus={handleChangeStatus}
                onDeleteQuery={handleDeleteQuery}
                query={query}
                status={status}
              />
            </div>

            <div className="block">
              {
                todos.length ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelectTodoId={handleSelectTodoId}
                  />
                ) : (
                  <Loader />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {
        selectedTodo && (
          <TodoModal
            todo={selectedTodo}
            onCloseModal={handleCloseModal}
          />
        )
      }
    </>
  );
};
