import React, { useState, useEffect, useMemo } from 'react';
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
  const [query, setQuery] = useState('');
  const [filteredBy, setFilteredBy] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const showFilteredBy = useMemo(() => {
    return todos.filter((todo) => {
      const filteredTitle = todo.title.toLowerCase()
        .includes(query.toLowerCase());

      switch (filteredBy) {
        case 'all':
          return filteredTitle;
        case 'active':
          return !todo.completed && filteredTitle;
        case 'completed':
          return todo.completed && filteredTitle;
        default:
          return 'error';
      }
    });
  }, [todos, query, filteredBy]);

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
                filteredBy={filteredBy}
                setFilteredBy={setFilteredBy}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={showFilteredBy}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
