/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsTodoLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsTodoLoading(false));
  }, []);

  let visibleTodos = [...todos];

  if (filter === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (filter === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  const preparedTodos = visibleTodos
    .filter(todo => {
      const { title } = todo;
      const preparedTitle = title.toLowerCase();
      const preparedQuery = query.toLowerCase().trim();

      return preparedTitle.includes(preparedQuery);
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
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {todos.length > 0
                && (
                  <TodoList
                    todos={preparedTodos}
                    selectedTodo={selectedTodo}
                    onSelectedTodo={setSelectedTodo}
                  />
                )}

              {isTodoLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>

      { selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          deleteSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
