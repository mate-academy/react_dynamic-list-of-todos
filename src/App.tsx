/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todoFromServer, setTodoFromServer] = useState<Todo[]>([]);
  const [filterSelect, setFilter] = useState('all');
  const [queryFilter, setQueryFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [selectedUser, setSelectedUser] = useState<User>();

  const visibleTodos = todoFromServer.filter(todo => {
    const matchesStatus =
      filterSelect === 'all' ||
      (filterSelect === 'active' && !todo.completed) ||
      (filterSelect === 'completed' && todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(queryFilter.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryFilter(event.target.value);
  };

  const resetQuery = () => {
    setQueryFilter('');
  };

  const idTodoSelect = (todoId: number): void => {
    const todo = todoFromServer.find(tod => tod.id === todoId);

    if (!todo) {
      return;
    }

    setSelectedTodo(todo);
    setSelectedUser(undefined);

    getUser(todo.userId).then(user => {
      setSelectedUser(user);
    });
  };

  const deleteModal = () => {
    setSelectedTodo(undefined);
    setSelectedUser(undefined);
  };

  useEffect(() => {
    getTodos().then(todos => {
      setTodoFromServer(todos);
      setLoading(false);
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
                filter={handleFilter}
                query={queryFilter}
                search={search}
                resetQuery={resetQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={visibleTodos}
                  idTodoSelect={idTodoSelect}
                  selectedTodoId={selectedTodo?.id}
                  deleteModal={deleteModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          deleteModal={deleteModal}
        />
      )}
    </>
  );
};
