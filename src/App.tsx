/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './app.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [todoStatus, setTodoStatus] = useState('all');
  const [todoModalId, setTodoModalId] = useState<null | number>(null);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => (setIsLoading(false)));
  }, []);

  let visibleTodos = todos;

  switch (todoStatus) {
    case 'active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (searchQuery) {
    visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }

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
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={visibleTodos}
                  setTodoModalId={setTodoModalId}
                  setSelectedTodo={setSelectedTodo}
                  todoModalId={todoModalId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoModalId && (
        <TodoModal
          userId={todoModalId}
          selectedTodo={selectedTodo}
          setTodoModalId={setTodoModalId}
        />
      )}
    </>
  );
};
