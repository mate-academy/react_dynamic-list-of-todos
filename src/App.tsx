/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getUser } from './api';
import { getTodos } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [select, setSelect] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => setLoading(false));
  }, []);

  function handleQueryChange(input: string) {
    setQuery(input);
  }

  function handleSelect(selector: string) {
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

    if (statusSelect === 'active') {
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
    } else if (statusSelect === 'completed') {
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
  }

  function handleShowTodo(todo: Todo) {
    getUser(todo.userId).then(person => {
      setUser(person);
      setSelectedTodo(todo);
    });
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
              {loading ? (
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

      {user && <TodoModal todo={selectedTodo} onCloseModal={closeModal} />}
    </>
  );
};
