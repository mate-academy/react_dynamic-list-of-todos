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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [filterMethod, setFilterMethod] = useState('');
  const [query, setQuery] = useState('');
  const onClickHandler = (currentTodo: Todo | null) => {
    setSelectedTodo(currentTodo);
    setUser(null);
  };

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
    });
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(userFromServer => {
        setUser(userFromServer);
      });
    }
  }, [selectedTodo]);

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onChangeFilterHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterMethod(event.target.value);
  };

  const resetQuery = () => setQuery('');

  const filtredTodos = todos.filter(todo => {
    const hasQuery = todo.title.includes(query.trim().toLowerCase());

    if (filterMethod === 'active') {
      return !todo.completed && hasQuery;
    }

    if (filterMethod === 'completed') {
      return todo.completed && hasQuery;
    }

    if (filterMethod === 'all') {
      return true && hasQuery;
    } else {
      return true && hasQuery;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={onChangeFilterHandler}
                onInputChange={onChangeInputHandler}
                query={query}
                reset={resetQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              {todos.length !== 0 && (
                <TodoList
                  todos={filtredTodos}
                  selectedTodo={selectedTodo}
                  onClickHandler={onClickHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          user={user}
          onClickHandler={onClickHandler}
        />
      )}
    </>
  );
};
