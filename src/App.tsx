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
  const [query, setQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState('all');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      let filteredTodos = [...todosFromServer];

      if (query) {
        filteredTodos = filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      if (filterBy === 'completed') {
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
      } else if (filterBy === 'active') {
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
      }

      setTodos(filteredTodos);
    });
  }, [query, filterBy]);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setUser(null);
    setSelectedTodo(null);
  };

  const getQuery = (searchQuery: string) => {
    if (searchQuery) {
      setQuery(searchQuery);
    } else {
      setQuery('');
    }
  };

  const getFilter = (option: string) => {
    if (option) {
      setFilterBy(option);
    } else {
      setFilterBy('all');
    }
  };

  const getUserById = (id: number) => {
    if (id) {
      getUser(id).then(setUser);
    } else {
      setUser(null);
    }
  };

  const getTodo = (todo: Todo) => {
    if (todo) {
      setSelectedTodo(todo);
    } else {
      setSelectedTodo(null);
    }
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
                getQuery={getQuery}
                getFilter={getFilter}
              />
            </div>

            <div className="block">
              {todos ? (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  openModal={handleOpenModal}
                  getUserById={getUserById}
                  getTodo={getTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <TodoModal user={user} todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
