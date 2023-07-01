/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './app.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { getFilteretTodos } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [todoStatus, setTodoStatus] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => (setIsLoading(false)));
  }, []);

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = useMemo(() => (
    getFilteretTodos(todos, searchQuery, todoStatus)
  ), [todoStatus, todos, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div
              className="block"
            >
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                todoStatus={todoStatus}
                setTodoStatus={setTodoStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (<Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          userId={selectedTodo.userId}
          selectedTodo={selectedTodo}
          clearSelectedTodo={clearSelectedTodo}
        />
      )}
    </>
  );
};
