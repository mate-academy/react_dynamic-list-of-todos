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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [sortedBy, setSortedBy] = useState('all');

  useEffect(() => {
    getTodos()
      .then(data => {
        let result = data;

        if (query) {
          const normalizeQuery = query.trim().toLowerCase();

          result = data.filter(todo =>
            todo.title.toLowerCase().includes(normalizeQuery),
          );
        }

        if (sortedBy !== 'all') {
          result = result.filter(todo =>
            sortedBy === 'completed' ? todo.completed : !todo.completed,
          );
        }

        setTodos(result);
      })
      .finally(() => setIsLoad(false));
  }, [sortedBy, query]);

  function selectTodo(todo: Todo) {
    setSelectedTodo(todo);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortedBy={sortedBy}
                setSortedBy={setSortedBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoad && <Loader />}
              <TodoList
                todos={todos}
                onSelect={selectTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
