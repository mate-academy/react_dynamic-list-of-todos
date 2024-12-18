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
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [loaderPage, setLoaderPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoaderPage(true);

    getTodos()
      .then(todos => {
        setTodoList(todos);
        setFilteredTodos(todos);
      })
      .catch(() => setErrorMessage(`Internal Server Error`))
      .finally(() => {
        setLoaderPage(false);
      });
  }, []);

  const handleTodoClick = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todoList} onFilterChange={setFilteredTodos} />
            </div>

            <div className="block">
              {loaderPage && <Loader />}
              {!loaderPage && todoList.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onClickTodo={handleTodoClick}
                  selected={selectedTodo}
                />
              )}
              {errorMessage && (
                <p className="notification is-danger">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClearSelectTodo={handleTodoClick} />
      )}
    </>
  );
};
