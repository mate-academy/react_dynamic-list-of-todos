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

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('error');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (todoId: number) => {
    const foundTodo = todos.find(todo => todo.id === todoId) || null;

    setSelectedTodo(foundTodo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const filtredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  });

  const visibleTodos = filtredTodos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={setFilterStatus}
                setValue={setQuery}
                value={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  setSelected={handleSelect}
                  activeTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
