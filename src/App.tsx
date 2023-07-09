/* eslint-disable max-len */
import {
  FC, useEffect, useState, useMemo, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { SelectStatus } from './enums/SelectStatus';
import { getFilteredTodos } from './utils/getFilteredTodos';
import './App.scss';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosStatus, setTodosStatus] = useState<SelectStatus>(SelectStatus.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, {
      todosStatus,
      query,
    });
  }, [todos, todosStatus, query]);

  const onModalClose = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={todosStatus}
                onStatusChange={setTodosStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  todoId={selectedTodo?.id || null}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onModalClose={onModalClose}
        />
      )}
    </>
  );
};
