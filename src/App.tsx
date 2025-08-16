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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortField, setSortField] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  type Params = {
    sf: string;
    q: string;
  };

  const preparedTodos = (
    items: Todo[],
    { sf, q }: Params,
  ): Todo[] => {
    let prepTodos = [...items];

    if (sf === 'active') {
      prepTodos = prepTodos.filter(todo => !todo.completed);
    }

    if (sortField === 'completed') {
      prepTodos = prepTodos.filter(todo => todo.completed);
    }

    if (q) {
      const normalizedQuery = q.trim().toLowerCase();

      prepTodos = prepTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return prepTodos;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortField={sortField}
                setSortField={setSortField}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              <TodoList
                todos={preparedTodos(todos, { sortField, query })}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
