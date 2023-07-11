/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import './App.css';
import { filterTodos } from './components/Helpers';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const [filter, setFilter] = useState<string >('all');
  const [query, setQuery] = useState('');

  const visibleTodos = useMemo(
    () => filterTodos(todos, filter, query),
    [todos, filter, query],
  );

  const loadTodos = async () => {
    setIsLoadingTodos(true);
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setIsLoadingTodos(false);
  };

  useEffect(() => {
    if (todos.length === 0) {
      loadTodos();
    }
  }, [selectedTodo]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterType = event.target.value;

    setFilter(filterType);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeFilter={handleFilterChange}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoadingTodos
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onChangeTodo={handleSelectTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          selectedTodo={selectedTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
