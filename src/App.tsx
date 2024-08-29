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
import { FilterTypes } from './types/FilterTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<FilterTypes>(
    FilterTypes.All,
  );
  const [query, setQuery] = useState('');

  const todo = selectedTodo;

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  let filteredTodos = [...todos];

  if (selectedUsers === FilterTypes.Active) {
    filteredTodos = filteredTodos.filter(t => !t.completed);
  }

  if (selectedUsers === FilterTypes.Completed) {
    filteredTodos = filteredTodos.filter(t => t.completed);
  }

  if (query) {
    filteredTodos = filteredTodos.filter(el =>
      el.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedUsers={setSelectedUsers}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  filteredTodos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  setIsModalActive={setIsModalActive}
                  isModalActive={isModalActive}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalActive && (
        <TodoModal
          selectedTodo={selectedTodo}
          todo={todo}
          setIsModalActive={setIsModalActive}
        />
      )}
    </>
  );
};
