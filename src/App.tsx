/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { getCurrentData } from './helper';
import { SortBy } from './types/types';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import './App.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.All);
  const [currentTodoId, setCurrentTodoId] = useState<null | number>(null);
  const [currentTodo, setCurrentTodo] = useState<null | Todo>(null);

  const currentTodos = getCurrentData<Todo>(todos, { query, sortBy });

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  useEffect(() => {
    setCurrentTodo(todos.find(todo => todo.id === currentTodoId) || null);
  }, [currentTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getQuery={setQuery}
                query={query}
                getSortBy={setSortBy}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={currentTodos}
                  getCurrentTodoId={setCurrentTodoId}
                  currentTodoId={currentTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} onClose={setCurrentTodoId} />}
    </>
  );
};
