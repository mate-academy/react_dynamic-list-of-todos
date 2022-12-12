/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
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
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedTodoId(todo.id);
  };

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
    setSelectedTodoId(null);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedFilter(event.target.value);
  };

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  };

  const clearQuery = () => {
    setQuery('');
  };

  useEffect(() => {
    const todosFromServer = async () => {
      const newTodos: Todo[] = await getTodos();

      if (selectedFilter === 'all') {
        setVisibleTodos(newTodos);
      }

      if (selectedFilter === 'completed') {
        setVisibleTodos(newTodos.filter(todo => todo.completed === true));
      }

      if (selectedFilter === 'active') {
        setVisibleTodos(newTodos.filter(todo => todo.completed === false));
      }
    };

    todosFromServer();
  }, [selectedFilter]);

  useEffect(() => {
    const userFromServer = async () => {
      let newUser = null;

      if (selectedTodo !== null) {
        newUser = await getUser(selectedTodo.userId);
      }

      setUser(newUser);
    };

    userFromServer();
  }, [selectedTodo]);

  // console.log(user);

  const getVisibleTodos = () => {
    if (query !== '') {
      return visibleTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return visibleTodos;
  };

  useMemo(
    getVisibleTodos,
    [query],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChange={handleChange}
                selectedFilter={selectedFilter}
                handleSearch={handleSearch}
                query={query}
                clearQuery={clearQuery}
              />
            </div>

            <div className="block">
              {
                visibleTodos.length === 0
                  ? <Loader />
                  : (
                    <TodoList
                      todos={getVisibleTodos()}
                      selectedTodoId={selectedTodoId}
                      onSelect={handleSelect}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          clearSelectedTodo={clearSelectedTodo}
          user={user}
        />
      )}
    </>
  );
};
