/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { User } from './types/User';

enum FilterBy {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[] | undefined>(undefined);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    getTodos()
      .then(data => setTodoList(data));
  }, []);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo?.userId)
        .then(data => setUser(data));
    } else {
      setUser(null);
    }
  }, [currentTodo]);

  const filteredTodos = todoList?.filter(todo => {
    switch (filterBy) {
      case FilterBy.Active:
        return todo.completed === false;

      case FilterBy.Completed:
        return todo.completed === true;

      default:
        return todo;
    }
  });

  const visibleTodos = filteredTodos?.filter(todo => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  const removeSelectedTodo = useCallback(
    () => setCurrentTodo(null),
    [],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {todoList
                ? (
                  <TodoList
                    todoList={visibleTodos}
                    setCurrentTodo={setCurrentTodo}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          user={user}
          currentTodo={currentTodo}
          onRemove={removeSelectedTodo}
        />
      )}
    </>
  );
};
