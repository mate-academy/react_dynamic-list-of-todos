/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [clickedPostId, setClickedPostId] = useState(0);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsDataLoading(false));
  }, []);

  const getTodoById = (todoId: number) =>
    todos.find(todo => todo.id === todoId);

  const selectedTodo = getTodoById(clickedPostId);

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    return matchesStatus && matchesQuery;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onQueryChange={setQuery}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isDataLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setClickedPostId={setClickedPostId}
                  selectedTodoId={clickedPostId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          key={selectedTodo.id}
          todo={selectedTodo}
          setClickedPostId={setClickedPostId}
        />
      )}
    </>
  );
};
