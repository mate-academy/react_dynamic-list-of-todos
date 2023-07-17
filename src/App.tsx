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
import { SearchField } from './types/SearchField';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [selectItem, setSelectItem] = useState(SearchField.ALL);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const preparedTodos = todos
    .filter(todo => {
      const normalTodo = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (selectItem) {
        case SearchField.ALL:
          return normalTodo;
        case SearchField.ACTIVE:
          return normalTodo && !todo.completed;
        case SearchField.COMPLETED:
          return normalTodo && todo.completed;
        default:
          throw new Error('Error');
      }
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectItem={setSelectItem}
                query={query}
                setQuery={(value: string) => setQuery(value)}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && !!todos.length && (
                <TodoList todos={preparedTodos} onSelect={setSelectedTodo} />
              )}
            </div>

          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
