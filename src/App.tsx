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
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasError, sethasError] = useState(false);
  const [todosFilter, setTodosFilter] = useState<'completed' | 'active' | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const onClosed = () => {
    setSelectedTodo(null);
  };

  const showAllTodos = () => {
    setTodosFilter(null);
  };

  useEffect(() => {
    getTodos()
      .then((res) => {
        setLoading(false);
        setTodos(res);
      })
      .catch(() => {
        sethasError(true);
      });
  }, []);

  const showActive = () => {
    setTodosFilter('active');
  };

  const showCompleted = () => {
    setTodosFilter('completed');
  };

  const filterTodos = todos.filter(todo => {
    if (todosFilter === null) {
      return true;
    }

    if (todosFilter === 'completed') {
      return todo.completed;
    }

    if (todosFilter === 'active') {
      return !todo.completed;
    }

    return true;
  })
    .filter(todo => todo.title.includes(query));

  if (hasError) {
    return (
      <div className="notification is-danger">
        <span className="icon is-centered">
          <i className="fa fa-exclamation-triangle" />
        </span>
        ---Catch error message from 404 response with axios or fetch in JavaScript---
      </div>
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                showCompleted={showCompleted}
                showActive={showActive}
                shawAllTodos={showAllTodos}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos}
                  onSelectTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClosed={onClosed}
        />
      )}
    </>
  );
};
