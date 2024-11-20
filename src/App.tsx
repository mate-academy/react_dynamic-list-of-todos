/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

type Props = {
  query: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  preparedTodos: Todo[];
  currentTodo: Todo;
  onClose: () => void;
};

enum SelectTodo {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
export const App: React.FC<Props> = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getPreparedTodo = (todosForQuery: Todo[], newQuery: string) => {
    let preparedTodos = [...todosForQuery];

    const queryIgnore = newQuery.toLowerCase().trim();

    if (newQuery) {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLowerCase().includes(queryIgnore),
      );
    }

    return preparedTodos;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  let visibleTodos = getPreparedTodo(todos, query);

  if (selectValue === SelectTodo.Active) {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (selectValue === SelectTodo.Completed) {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  const clearQuery = () => {
    setQuery('');
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  const canselSelectedTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                query={query}
                handleChange={handleChange}
                clearQuery={clearQuery}
                handleSelectChange={handleSelectChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && !!todos.length && (
                <TodoList
                  todos={visibleTodos}
                  onSelect={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          currentTodo={selectedTodo}
          onClose={canselSelectedTodo}
          user={null}
          cardLoading={false}
        />
      )}
    </div>
  );
};
