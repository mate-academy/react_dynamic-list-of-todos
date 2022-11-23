/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [todoTitleFilter, setTodoTitleFilter] = useState('');
  const [todoStatusFilter, setTodoStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then((allTodos) => {
      setTodosFromServer(allTodos);
    }).then(() => {
      setIsLoading(false);
    });
  }, []);

  const visibleTodos = todosFromServer.filter((todo) => {
    switch (todoStatusFilter) {
      case 'all':
        return todo.title.toLowerCase()
          .includes(todoTitleFilter.toLowerCase());
      case 'active':
        return !todo.completed
          && todo.title.toLowerCase()
            .includes(todoTitleFilter.toLowerCase());
      case 'completed':
        return todo.completed
          && todo.title.toLowerCase()
            .includes(todoTitleFilter.toLowerCase());
      default:
        return todo;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={todoStatusFilter}
                setStatusFilter={setTodoStatusFilter}
                titleFilter={todoTitleFilter}
                setTitleFilter={setTodoTitleFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    currentTodo={currentTodo}
                    setCurrentTodo={setCurrentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          setCurrentTodo={setCurrentTodo}
        />
      )}
    </>
  );
};
