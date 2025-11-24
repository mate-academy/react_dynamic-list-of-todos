/* eslint-disable max-len */
import React, { useMemo, useEffect, useState } from 'react';
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
  const [select, setSelect] = useState('all');
  const [query, setQuery] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorTodosMessage, setErrorTodosMessage] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((todosFromServer: Todo[]) => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErrorTodosMessage('Try reload later');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleSelected(todo: Todo) {
    setSelectedTodo(todo);
  }

  function handleCloseTodo() {
    setSelectedTodo(null);
  }

  function handleSelect(currentSelect: string) {
    setSelect(currentSelect);
  }

  function handleQuery(currentQuery: string) {
    setQuery(currentQuery);
  }

  const selectedTodos = useMemo(() => {
    switch (select) {
      case 'active':
        return todos.filter(todo => todo.completed === false);

      case 'completed':
        return todos.filter(todo => todo.completed === true);

      default:
        return [...todos];
    }
  }, [todos, select]);

  const filteredTodos = useMemo(() => {
    if (query.trim() === '') {
      return selectedTodos;
    }

    return selectedTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = query.toLowerCase().trim();

      return normalizedTitle.includes(normalizedQuery);
    });
  }, [selectedTodos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelect={handleSelect} onQuery={handleQuery} />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && !errorTodosMessage && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onSelected={handleSelected}
                  selectedTodo={selectedTodo}
                />
              )}
              {!loading && !errorTodosMessage && !todos.length && (
                <p className="title is-5">No todos</p>
              )}
              {!loading && errorTodosMessage && (
                <p className="notification is-danger">{errorTodosMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onCloseTodo={handleCloseTodo} />
      )}
    </>
  );
};
