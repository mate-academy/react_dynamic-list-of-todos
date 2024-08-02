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
  const [loading, setLoading] = useState(false);
  const [sorted, setSorted] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    if (sorted === 'all') {
      getTodos()
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then(todos =>
          setTodos(
            todos.filter(todo =>
              todo.title.toLowerCase().includes(query.toLowerCase()),
            ),
          ),
        )
        .finally(() => setLoading(false));
    }

    if (sorted === 'active') {
      getTodos()
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then(todos =>
          setTodos(
            todos.filter(
              todo =>
                !todo.completed &&
                todo.title.toLowerCase().includes(query.toLowerCase()),
            ),
          ),
        )
        .finally(() => setLoading(false));
    }

    if (sorted === 'completed') {
      getTodos()
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then(todos =>
          setTodos(
            todos.filter(
              todo =>
                todo.completed &&
                todo.title.toLowerCase().includes(query.toLowerCase()),
            ),
          ),
        )
        .finally(() => setLoading(false));
    }
  }, [sorted, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                query={query}
                setSorted={setSorted}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  setselectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
