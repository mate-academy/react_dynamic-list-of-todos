/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { Select } from './types/Select';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [status, setStatus] = useState(Select.ALL);
  const [query, setQuery] = useState('');

  const visibleTodos = useMemo(() => {
    return todos.filter(td => {
      const titleLow = td.title.toLowerCase();
      const queryLow = query.toLowerCase();
      const { completed } = td;

      switch (status) {
        case Select.ALL:
          return titleLow.includes(queryLow);
        case Select.ACTIVE:
          return !completed && titleLow.includes(queryLow);
        case Select.COMLETED:
          return completed && titleLow.includes(queryLow);
        default:
          return td;
      }
    });
  }, [status, query, todos]);

  const loadTodos = async () => {
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
  };

  const loadUser = async (userId: number) => {
    const loadedUser = await getUser(userId);

    setUser(loadedUser);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSelectTodo = (selectedTodo: Todo) => {
    setSelectedTodoId(selectedTodo.id);
    setSelectedUserId(selectedTodo.userId);
    setTodo(selectedTodo);
    loadUser(selectedTodo.userId);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(0);
    setSelectedUserId(0);
    setUser(null);
    setTodo(null);
  };

  const handleChangeSelect = (value: Select) => setStatus(value);
  const handleChangeInput = (value: string) => setQuery(value);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                handleSelect={handleChangeSelect}
                handleInput={handleChangeInput}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  selectTodo={handleSelectTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedUserId && (
        <TodoModal
          user={user}
          userId={selectedUserId}
          todo={todo}
          closeModal={handleCloseModal}
        />
      )}
    </>
  );
};
