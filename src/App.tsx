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
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [isModal, setIsModal] = useState(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const handleShow = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModal(true);
  };

  const handleClose = () => {
    setSelectedTodo(null);
    setIsModal(false);
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active' && todo.completed) {
      return false;
    }

    if (filter === 'completed' && !todo.completed) {
      return false;
    }

    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                onFilterChange={setFilter}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onShow={handleShow}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && isModal && (
        <TodoModal todo={selectedTodo} onClose={handleClose} />
      )}
    </>
  );
};
