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
import { getTodosFilteredByCompleted, getTodosIncludesQuery } from './components/helper/helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [titleFilter, setTitleFilter] = useState('');
  const [completedFilter, setCompletedFilter] = useState('all');

  const closeModal = useCallback(
    () => {
      setSelectedTodoId(0);
    },
    [],
  );

  useEffect(() => {
    getTodos().then((todo) => setTodos(todo));
  }, []);

  let visibleTodos = todos;

  if (titleFilter) {
    visibleTodos = getTodosIncludesQuery(visibleTodos, titleFilter);
  }

  visibleTodos = useMemo(() => getTodosFilteredByCompleted(visibleTodos, completedFilter), [completedFilter, visibleTodos]);

  const selectedTodo = useMemo(
    () => visibleTodos.find((todo) => todo.id === selectedTodoId),
    [selectedTodoId, visibleTodos],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                titleFilter={titleFilter}
                onTitleFilterChange={setTitleFilter}
                completedFilter={completedFilter}
                onChangeFilter={setCompletedFilter}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodoId={setSelectedTodoId}
                  selectedTodoId={selectedTodoId}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal onCloseModal={closeModal} todo={selectedTodo} />
      )}
    </>
  );
};
