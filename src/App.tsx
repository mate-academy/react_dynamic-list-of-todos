/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [toDoList, setToDoList] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchString, setSearchString] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShow = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const USER_ID = 1;

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todos => {
        setToDoList(todos);
        setFilteredTodos(todos);
      })
      .catch(() => {
        setToDoList([]);
        setFilteredTodos([]);
      })
      .finally(() => setIsLoading(false));

    setUserLoading(true);

    getUser(USER_ID)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setUserLoading(false));
  }, []);

  useEffect(() => {
    switch (selectedFilter) {
      case 'active':
        setFilteredTodos(toDoList.filter(todo => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(toDoList.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(toDoList);
    }

    setFilteredTodos(
      toDoList.filter(todo => todo.title.includes(searchString)),
    );
  }, [selectedFilter, searchString, toDoList]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selected={selectedFilter}
                searchString={searchString}
                setSelected={setSelectedFilter}
                setSearchString={setSearchString}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShow={handleShow}
                  selectedId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal &&
        (userLoading ? (
          <Loader />
        ) : (
          <TodoModal
            user={user}
            todo={selectedTodo}
            closeModal={() => setShowModal(false)}
          />
        ))}
    </>
  );
};
