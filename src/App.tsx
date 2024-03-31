/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilteringOption } from './types/FilteringOption';
import { Status } from './types/Status';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';

const getPreparedTodos = (
  todos: Todo[],
  { selectedStatus, query }: FilteringOption,
) => {
  let preparedTodos = [...todos];

  switch (selectedStatus) {
    case 'active':
      preparedTodos = todos.filter(todo => !todo.completed);
      break;
    case 'completed':
      preparedTodos = todos.filter(todo => todo.completed);
      break;
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    preparedTodos = preparedTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const [isListLoading, setIsListLoading] = useState(true);
  const [isModalShowing, setIsModalShowing] = useState(false);

  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Status>('all');

  let visibleTodos = getPreparedTodos(todos, { selectedStatus, query });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsListLoading(false));
  }, []);

  const handleClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalShowing(true);
  };

  const handleDelete = () => {
    setIsModalShowing(false);
  };

  const handleReset = () => {
    setQuery('');
    visibleTodos = todos;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onReset={handleReset}
                onQueryChange={setQuery}
                onStatusChange={setSelectedStatus}
              />
            </div>

            {isListLoading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                  onClick={handleClick}
                  isModalShowing={isModalShowing}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalShowing && (
        <TodoModal todo={selectedTodo} onDelete={handleDelete} />
      )}
    </>
  );
};
