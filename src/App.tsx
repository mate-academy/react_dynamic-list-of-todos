/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleTodos, setVisibleTotos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState(0);

  const select = (value: number) => setSelectedTodo(value);

  useEffect(() => {
    const loading = async () => {
      setTodosFromServer(await getTodos());
      setVisibleTotos(await getTodos());
      setIsLoading(true);
    };

    loading();
  }, []);

  const filtredTodos = (value: string, status: string) => {
    const todos = todosFromServer.filter(todo => {
      switch (status) {
        case 'completed':
          return todo.completed && todo.title.includes(value);
        case 'active':
          return !todo.completed && todo.title.includes(value);
        default:
          return todo.title.includes(value);
      }
    });

    setVisibleTotos(todos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filtredTodos={filtredTodos} />
            </div>

            <div className="block">
              {!isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    select={select}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo > 0 && (
        <TodoModal
          todo={visibleTodos.find(todo => todo.id === selectedTodo)}
          select={select}
        />
      )}
    </>
  );
};
