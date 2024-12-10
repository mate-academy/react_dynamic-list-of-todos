/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Filter } from './types/Options';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodo, setLoadingTodo] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [selectedOption, setSelectedOption] = useState<Filter>(Filter.all);
  const [query, setQuery] = useState<string>('');

  function handleSelectedOption(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(event.target.value as Filter);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function showSelectedTodo(todo: Todo) {
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setLoadingUser(false));
  }

  function closeSelectedTodo() {
    setSelectedTodo(null);
    setSelectedUser(null);
  }

  function resetFilterParams() {
    setQuery('');
    setSelectedOption(Filter.all);
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodo(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={query}
                handleSelectedOption={handleSelectedOption}
                handleQueryChange={handleQueryChange}
                resetFilterParams={resetFilterParams}
              />
            </div>

            <div className="block">
              {loadingTodo && <Loader />}
              <TodoList
                todos={todos}
                showSelectedTodo={showSelectedTodo}
                selectedOption={selectedOption}
                query={query}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeTodo={closeSelectedTodo}
          user={selectedUser}
          loadingUser={loadingUser}
        />
      )}
    </>
  );
};
