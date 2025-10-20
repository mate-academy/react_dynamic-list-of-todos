/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [query, setQuery] = useState('');
  const [optionFilterValue, setOptionFilterValue] = useState('All');
  const getVisibleTodos = () => {
    const byStatus = todos.filter(todo =>
      optionFilterValue === 'All'
        ? true
        : optionFilterValue === 'completed'
          ? todo.completed
          : !todo.completed,
    );

    const queryValidated = query.toLowerCase().trim();

    return byStatus.filter(todo =>
      queryValidated ? todo.title.includes(queryValidated) : true,
    );
  };

  const visibleTodos = getVisibleTodos();

  useEffect(() => {
    if (selected) {
      setLoading(true);
      getUser(selected.userId)
        .then(user => setSelectedUser(user))
        .finally(() => setLoading(false));
    }
  }, [selected]);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(error => setErrorMessage(String(error)))
      .finally(() => setLoading(false));
  }, []);

  const getSelected = () => {
    return todos.find(todo => selected === todo) || null;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            {errorMessage ? String(errorMessage) : ''}

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                setOptionFilterValue={setOptionFilterValue}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                selectedTodo={selected}
                handleSelected={arg => setSelected(arg)}
                todos={visibleTodos}
              />
            </div>
          </div>
        </div>
      </div>
      <TodoModal
        selected={getSelected()}
        handleSelected={() => setSelected(null)}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        loading={loading}
      />
    </>
  );
};
