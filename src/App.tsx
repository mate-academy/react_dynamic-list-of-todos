/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      getTodos()
        .then(setTodos);
      setLoadingTodos(false);
    }, 1000);
  }, []);

  if (selectedTodo) {
    getUser(selectedTodo.userId)
      .then(setUser);
  }

  let filteredTodos = todos;

  if (filter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  if (query) {
    filteredTodos = filteredTodos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  const resetQuery = () => {
    setQuery('');
    setTodos(todos);
  };

  const handleShowButtonClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setFilter={setFilter}
                setQuery={setQuery}
                resetQuery={resetQuery}
              />
            </div>

            <div className="block">
              {loadingTodos
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    onShowButtonClick={handleShowButtonClick}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal user={user} selectedTodo={selectedTodo} onClose={handleModalClose} />}
    </>
  );
};
