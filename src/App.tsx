/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { ActiveTodo } from './types/ActiveTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [todoActiveFilter, setTodoActiveFilter] = useState<ActiveTodo>(ActiveTodo.All);
  const [modalActiveTodo, setModalActiveTodo] = useState<Todo | null>(null);

  const handleResetUser = useCallback(() => {
    setModalActiveTodo(null);
  }, []);

  const handleSetFilter = useCallback(
    (event:React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case 'active':
          setTodoActiveFilter(ActiveTodo.Active);
          break;
        case 'completed':
          setTodoActiveFilter(ActiveTodo.Completed);
          break;
        case 'all':
          setTodoActiveFilter(ActiveTodo.All);
          break;
        default:
          throw new Error('Unknown filter');
      }
    }, [],
  );

  const handleSetQuery = useCallback(
    (event:React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value.toLowerCase());
    }, [],
  );

  const resetQuery = useCallback(
    () => {
      setQuery('');
    }, [],
  );

  const handleSetModalTodo = useCallback(
    (todo: Todo) => {
      setModalActiveTodo(todo);
    }, [],
  );

  const loadTodos = useCallback(
    async () => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    }, [],
  );

  useEffect(() => {
    loadTodos();
  }, []);

  let preparedTodos = todos;

  useMemo(() => {
    switch (todoActiveFilter) {
      case ActiveTodo.Active:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
      case ActiveTodo.Completed:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
      case ActiveTodo.All:
        break;
      default:
        break;
    }

    if (query) {
      preparedTodos = preparedTodos.filter(todo => todo.title.includes(query));
    }
  }, [todoActiveFilter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSetFilter={handleSetFilter}
                query={query}
                onSetQuery={handleSetQuery}
                resetQuery={resetQuery}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={preparedTodos}
                    onSelect={handleSetModalTodo}
                    activeTodo={modalActiveTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalActiveTodo
        && (
          <TodoModal
            todo={modalActiveTodo}
            onClose={handleResetUser}
          />
        )}
    </>
  );
};
