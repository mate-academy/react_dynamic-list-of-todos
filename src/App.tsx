import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoStatus } from './types/TodoStatus';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState<TodoStatus>(
    TodoStatus.All,
  );
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openedTodoId, setOpenedTodoId] = useState<number | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsTodoLoading(true);
    getTodos()
      .then(todos => {
        setTodoList(todos);
        setIsTodoLoading(false);
      })
      .catch(() => {
        setErrorMessage('Failed to load todos. Please try again.');
        setIsTodoLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsTodoLoading(true);
    getTodos()
      .then(todos => {
        if (filterByStatus === TodoStatus.All) {
          return todos;
        }

        return todos.filter(todo => {
          switch (filterByStatus) {
            case TodoStatus.ACTIVE:
              return todo.completed === false;
            case TodoStatus.COMPLETED:
              return todo.completed === true;
          }
        });
      })
      .then(todos => {
        if (search.length === 0) {
          return todos;
        } else {
          return todos.filter(todo =>
            todo.title.toLocaleLowerCase().includes(search),
          );
        }
      })
      .then(todos => {
        setTodoList(todos);
        setIsTodoLoading(false);
      })
      .catch(() => {
        setErrorMessage('Failed to filter todos. Please try again.');
        setIsTodoLoading(false);
      });
  }, [filterByStatus, search]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setOpenedTodoId(todo.id);
    setIsModalLoading(true);
    setSelectedUser(null);

    getUser(todo.userId)
      .then(user => {
        setSelectedUser(user);
        setIsModalLoading(false);
      })
      .catch(() => {
        setErrorMessage('Failed to load user details. Please try again.');
        setIsModalLoading(false);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setSelectedUser(null);
    setOpenedTodoId(null);
  };

  const handleClearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      {errorMessage && (
        <div className="notification is-danger">
          <button className="delete" onClick={handleClearError}></button>
          {errorMessage}
        </div>
      )}

      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={filterByStatus}
                onSelectStatus={newStatus => {
                  setFilterByStatus(newStatus);
                }}
                searchValue={search}
                onSearchValueChange={searchValue => setSearch(searchValue)}
                onSearchValueClear={() => setSearch('')}
              />
            </div>

            <div className="block">
              {isTodoLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todoList={todoList}
                  onTodoSelect={handleTodoSelect}
                  openedTodoId={openedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isTodoLoading={isModalLoading}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
};
