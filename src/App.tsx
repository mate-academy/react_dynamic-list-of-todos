/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);

  const [statusSelect, setStatusSelect] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    let result = [...todos];

    if (statusSelect === 'active') {
      result = result.filter(a => !a.completed);
    } else if (statusSelect === 'completed') {
      result = result.filter(a => a.completed);
    }

    if (query) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setFilteredTodos(result);
  }, [statusSelect, todos, query]);

  const handleSelectTodo = (todo: Todo) => {
    setLoader(true);
    setSelectedTodo(todo);
    setIsModalOpen(true);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setLoader(false));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectChange={setStatusSelect}
                inputChange={setQuery}
                searchValue={query}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelect={handleSelectTodo}
                  selectedTodoId={selectedTodo?.id ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          loading={loader}
          onClose={closeModal}
        />
      )}
    </>
  );
};
