/* eslint-disable */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

type StringCompletedOptions = 'all' | 'active' | 'completed';

type FilterProps = {
  query: string;
  completeQuery: StringCompletedOptions;
};

function prepareTodos(
  todosFromServer: Todo[],
  { query, completeQuery }: FilterProps,
) {
  let todos = [...todosFromServer];

  if (query) {
    todos = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (completeQuery !== 'all') {
    const completeBoolean = completeQuery === 'active' ? false : true;
    todos = todos.filter(todo => todo.completed === completeBoolean);
  }

  return todos;
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [completeQuery, setCompleteQuery] =
    useState<StringCompletedOptions>('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleSelectedTodoIdChange = (id: number) => {
    setSelectedTodoId(id);
  };

  const handleWindowClose = () => {
    setSelectedTodoId(null);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleCompleteQueryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCompleteQuery(event.target.value as StringCompletedOptions);
  };

  const handleFilterClear = () => {
    setQuery('');
  };

  const visibleTodos = prepareTodos(todos, { query, completeQuery });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                completeQuery={completeQuery}
                handleQueryChange={handleQueryChange}
                handleCompleteQueryChange={handleCompleteQueryChange}
                handleFilterClear={handleFilterClear}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onTodoSelect={handleSelectedTodoIdChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todo={todos.find(todo => todo.id === selectedTodoId) as Todo}
          handleWindowClose={handleWindowClose}
        />
      )}
    </>
  );
};
