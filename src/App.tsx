/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilterEnum';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasError, sethasError] = useState(false);
  const [todosFilter, setTodosFilter] = useState<TodosFilter | string>(
    TodosFilter.all,
  );
  const [loading, setLoading] = useState<boolean>(true);

  const onClosed = () => {
    setSelectedTodo(null);
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

  const filterTodos = todos
    .filter((todo) => {
      if (todosFilter === TodosFilter.completed) {
        return todo.completed;
      }

      if (todosFilter === TodosFilter.active) {
        return !todo.completed;
      }

      return true;
    })
    .filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));

  if (hasError) {
    return (
      <div className="notification is-danger">
        <span className="icon is-centered">
          <i className="fa fa-exclamation-triangle" />
        </span>
        ---Catch error message from 404 response with axios or fetch in
        JavaScript---
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
                shawAllTodos={setTodosFilter}
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

      {selectedTodo && <TodoModal todo={selectedTodo} onClosed={onClosed} />}
    </>
  );
};
