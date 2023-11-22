/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [pageLoading, setPageLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPageLoading(true);
    getTodos().then(setTodos)
      .finally(() => setPageLoading(false));
  }, []);

  useEffect(() => {
    switch (filter) {
      case 'active':
        getTodos()
          .then(todosList => todosList.filter(todo => !todo.completed
            && todo.title.toLowerCase().includes(search.toLowerCase())))
          .then(setTodos);
        break;

      case 'completed':
        getTodos()
          .then(todosList => todosList.filter(todo => todo.completed
            && todo.title.toLowerCase().includes(search.toLowerCase())))
          .then(setTodos);
        break;

      default:
        getTodos()
          .then(todosList => todosList.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase())))
          .then(setTodos);
    }
  }, [filter, search]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div className="block">
              {pageLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={todos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                    setSelectedUser={setSelectedUser}
                    setModalLoading={setModalLoading}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          modalLoading={modalLoading}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </>
  );
};
