/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todosAll, setTodosAll] = useState<Todo[]>([]);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [sortField, setSortField] = useState<string>('all');

  const [filteredList, setFilteredList] = useState<Todo[]>([]);

  const [newSearchValue, setNewSearchValue] = useState<string>('');

  const [user, setUser] = useState<User | null>(null);

  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodosAll)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let vueList = todosAll;

    if (sortField === 'all') {
      vueList = todosAll;
    }

    if (sortField === 'active') {
      vueList = todosAll.filter(todo => todo.completed === false);
    }

    if (sortField === 'completed') {
      vueList = todosAll.filter(todo => todo.completed === true);
    }

    if (newSearchValue.length > 0) {
      vueList = vueList.filter(todo =>
        todo.title.toLowerCase().includes(newSearchValue.toLowerCase()),
      );
    }

    setFilteredList(vueList);
  }, [todosAll, sortField, newSearchValue]);

  useEffect(() => {
    if (selectedTodo) {
      setLoadingUser(true);

      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setLoadingUser(false));
    }
  }, [selectedTodo]);

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortBy={(filterValue: string) => setSortField(filterValue)}
                search={(value: string) => setNewSearchValue(value)}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todosAll.length > 0 && (
                <TodoList
                todos={filteredList}
                selectedTodoToApp={(todo: Todo | null) =>
                  setSelectedTodo(todo)
                }
                selectedTodo={selectedTodo}
              />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          user={user}
          selectedTodo={selectedTodo}
          loadingUser={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
