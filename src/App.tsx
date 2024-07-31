/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getUser } from './api';
import { getTodos } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoStatus } from './types/Select';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [select, setSelect] = useState(TodoStatus.All);
  const [query, setQuery] = useState('');
  const [loadingTodo, setLoadingTodo] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodo(false));
  }, []);

  function handleQueryChange(input: string) {
    setQuery(input);
  }

  function handleSelect(selector: TodoStatus) {
    setSelect(selector);
  }

  function handleClearInput() {
    setQuery('');
  }

  function getPreparedTodos(
    todoList: Todo[],
    statusSelect: string,
    queryFilter: string,
  ) {
    let preparedTodos = [...todoList];

    if (statusSelect === TodoStatus.Active) {
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
    } else if (statusSelect === TodoStatus.Completed) {
      preparedTodos = preparedTodos.filter(todo => todo.completed);
    }

    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(queryFilter.toLowerCase()),
    );

    return preparedTodos;
  }

  function closeModal() {
    setUser(null);
    setSelectedTodo(null);
    setLoadingUser(true);
  }

  function handleShowTodo(todo: Todo) {
    getUser(todo.userId)
      .then(person => {
        setUser(person);
        setSelectedTodo(todo);
      })
      .finally(() => setLoadingUser(false));
  }

  const preparedTodos = getPreparedTodos(todos, select, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                select={select}
                onSelect={handleSelect}
                onQueryChange={handleQueryChange}
                clearInput={handleClearInput}
              />
            </div>

            <div className="block">
              {loadingTodo ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  onShowTodo={handleShowTodo}
                  selTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={closeModal}
          user={user}
          loadingUser={loadingUser}
        />
      )}
    </>
  );
};
