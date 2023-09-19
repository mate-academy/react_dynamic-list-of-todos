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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chosenTodo, setChosenTodo] = useState<Todo | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [chosenUser, setChosenUser] = useState<User | null>(null);

  useEffect(() => {
    getTodos()
      .then(
        setTodos,
      );

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (chosenTodo !== null) {
      getUser(chosenTodo.userId)
        .then(
          setChosenUser,
        );
    }
  }, [chosenTodo]);

  const handleFilterTodos = () => {
    let todosfiltered = [...todos];

    if (searchInput !== '') {
      todosfiltered = todosfiltered.filter((todo) => (todo.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())));
    }

    if (filter === 'active') {
      todosfiltered = todosfiltered.filter((todo) => todo.completed === false);
    }

    if (filter === 'completed') {
      todosfiltered = todosfiltered.filter((todo) => todo.completed === true);
    }

    return todosfiltered;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : <TodoList dataTodos={handleFilterTodos()} setChosenTodo={setChosenTodo} />}

            </div>
          </div>
        </div>
      </div>

      {chosenTodo && (
        <TodoModal
          chosenTodo={chosenTodo}
          setChosenTodo={setChosenTodo}
          chosenUser={chosenUser}
          setChosenUser={setChosenUser}
        />
      )}
    </>
  );
};
