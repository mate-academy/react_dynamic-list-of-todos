/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { User } from './types/User';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import './types/FilterBy';
import { ACTIVE, COMPLETED, ALL } from './types/FilterBy';
import { TodoModal } from './components/TodoModal';

function filterTodos(allTodos: Todo[], query: string, filter: string) {
  let todos = [...allTodos];

  if (query) {
    const queryLowerCase = query.toLowerCase();

    todos = todos.filter(todo =>
      todo.title.toLowerCase().includes(queryLowerCase),
    );
  }

  switch (filter) {
    case ACTIVE:
      return todos.filter(todo => !todo.completed);

    case COMPLETED:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(ALL);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const onEyeClicked = (newTodo: Todo) => {
    setShowModal(true);
    getUser(newTodo.userId).then(userFromApi => {
      setUser(userFromApi);
    });
    setSelectedTodo(newTodo);
  };

  const onCloseClicked = () => {
    setShowModal(false);
    setUser(null);
    setSelectedTodo(null);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromApi => {
        setTodos(todosFromApi);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuery={setQuery}
                query={query}
                filter={filter}
                onFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos(todos, query, filter)}
                  onEyeClicked={onEyeClicked}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <TodoModal
          onCloseClicked={onCloseClicked}
          user={user}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
