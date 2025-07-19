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
  const [select, setSelect] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosApi => {
        let filteredTodos = todosApi;

        switch (select) {
          case 'completed':
            filteredTodos = filteredTodos.filter(todo => todo.completed);
            break;
          case 'active':
            filteredTodos = filteredTodos.filter(todo => !todo.completed);
            break;
          default:
            break;
        }

        if (query) {
          filteredTodos = filteredTodos.filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
        }

        setTodos(filteredTodos);
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => {
        setLoading(false);
      });

    return () => {};
  }, [select, query]);

  const handleTodoClick = (id: number) => {
    setShowModal(true);
    const selectedTodoFetch = todos.find(todo => todo.id === id);

    if (selectedTodoFetch) {
      setSelectedTodo(selectedTodoFetch);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTodo(undefined);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                select={select}
                setSelect={setSelect}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && !errorMessage && (
                <TodoList
                  todos={todos}
                  onClick={handleTodoClick}
                  todoSet={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal onClick={handleModalClose} todo={selectedTodo} />
      )}
    </>
  );
};
