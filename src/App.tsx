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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [filterByStatus, setFilterByStatus] = useState<Status>('all');

  const visibleTodos = todos.filter(todo => {
    switch (filterByStatus) {
      case 'all':
        return todo.title.toLowerCase().includes(query.trim().toLowerCase());

      case 'completed':
        return (
          todo.title.toLowerCase().includes(query.trim().toLowerCase()) &&
          todo.completed
        );

      case 'active':
        return (
          todo.title.toLowerCase().includes(query.trim().toLowerCase()) &&
          !todo.completed
        );
    }
  });

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setLoading(false);
    });
  }, []);

  const todoById = todos.find(todo => todo.id === selectedTodo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterByStatus={filterByStatus}
                setFilterByStatus={setFilterByStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todoById={todoById} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
