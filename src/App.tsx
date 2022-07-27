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
  const [isLoading, setLoading] = useState(true);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState(0);

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const loadingTodo = await getTodos();

        setTodosFromServer(loadingTodo);
        setVisibleTodos(loadingTodo);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadTodo();
  }, []);

  const filteredTodos = (query: string, condition: string) => {
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

    setTodosFromServer(todos);
  };

  const select = (value: number) => setSelectedTodo(value);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filteredTodos={filteredTodos}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={select}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={visibleTodos.find(todo => todo.id === selectedTodo)}
          selectUser={select}
        />
      )}
    </>
  );
};
