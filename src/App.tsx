/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

type FilterType = 'all' | 'active' | 'completed';

export const App: React.FC<{ todosList: Todo[]; users: User[] }> = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);

  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [userLoadError, setUserLoadError] = useState<string | null>(null);

  // 1️⃣ Завантаження todos при старті
  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await getTodos();

        setTodosList(todosData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2️⃣ Завантаження користувача при відкритті модалки
  useEffect(() => {
    if (!showModal || !selectedTodo) {
      return;
    }

    let cancelled = false;

    setIsLoadingUser(true);
    setSelectedUser(null);
    setUserLoadError(null);

    getUser(selectedTodo.userId)
      .then(userData => {
        if (!cancelled) {
          setSelectedUser(userData);
        }
      })
      .catch(error => {
        if (!cancelled) {
          // eslint-disable-next-line no-console
          console.error(`Failed to fetch user: ${error}`);
          setUserLoadError('Failed to load user data');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoadingUser(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [showModal, selectedTodo]);

  const filterTodos = (type: FilterType, searchText: string, todos: Todo[]) => {
    return todos.filter(todo => {
      const matchesFilter =
        type === 'all' ||
        (type === 'active' ? !todo.completed : todo.completed);
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                onFilterChange={setFilterType}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            <div className="block">
              <TodoList
                todos={filterTodos(filterType, searchTerm, todosList)}
                onToggleModal={setShowModal}
                showModal={showModal}
                onSelectTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedTodo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {isLoadingUser ? (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${selectedTodo.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => setShowModal(false)}
                />
              </header>

              <div className="modal-card-body">
                <Loader />
              </div>
            </div>
          ) : userLoadError ? (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${selectedTodo.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => setShowModal(false)}
                />
              </header>

              <div className="modal-card-body">
                <p className="has-text-danger">{userLoadError}</p>
              </div>
            </div>
          ) : selectedUser ? (
            <TodoModal
              user={selectedUser}
              onClose={() => setShowModal(false)}
              selectedTodo={selectedTodo}
            />
          ) : null}
        </div>
      )}
    </>
  );
};
