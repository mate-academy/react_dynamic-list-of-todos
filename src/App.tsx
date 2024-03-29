/* eslint-disable max-len */
import React, { useState } from 'react';
import { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { CompletedStatus } from './types/CompletedStatus';
import { SelectedTodo } from './types/SelectedTodo';

type FilterProps = {
  completedStatus: CompletedStatus;
  query: string;
};

const getPreparedTodos = (
  todos: Todo[],
  { completedStatus, query: filterByQuery }: FilterProps,
): Todo[] => {
  let preparedTodos = [...todos];

  switch (completedStatus) {
    case 'active':
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      preparedTodos = preparedTodos.filter(todo => todo.completed);
  }

  if (filterByQuery) {
    preparedTodos = preparedTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = filterByQuery.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<SelectedTodo>(null);
  const [query, setQuery] = useState('');
  const [completedStatus, setCompletedStatus] =
    useState<CompletedStatus>('all');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
  }, []);

  const preparedTodos = getPreparedTodos(todos, { completedStatus, query });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSetCompleted={setCompletedStatus}
                onSetQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && !errorMessage && (
                <TodoList
                  todos={preparedTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onSelectTodo={setSelectedTodo} />
      )}
    </>
  );
};
