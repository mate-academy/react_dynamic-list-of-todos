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
  const [visibleTodos, setVisibleTotos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(0);

  useEffect(() => {
    const loading = async () => {
      const loadingTodo = await getTodos();

      setTodosFromServer(loadingTodo);
      setVisibleTotos(loadingTodo);
      setLoading(true);
    };

    loading();
  }, []);

  const filtredTodos = (query: string, condition: string) => {
    const todos = todosFromServer.filter(todo => {
      switch (condition) {
        case 'active':
          return !todo.completed && todo.title.includes(query);

        case 'completed':
          return todo.completed && todo.title.includes(query);

        default:
          return todo.title.includes(query);
      }
    });

    setVisibleTotos(todos);
  };

  const select = (query: number) => setSelectedTodo(query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filteredTodos={filtredTodos} />
            </div>

            <div className="block">
              {!isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={select}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo > 0 && (
        <TodoModal
          todo={visibleTodos.find(todo => todo.id === selectedTodo)}
          selectUser={select}
        />
      )}
    </>
  );
};
