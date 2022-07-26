/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelesctedTodo] = useState(0);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
        setLoading(false);
        setHasLoadingError(false);
      } catch (error) {
        setHasLoadingError(true);
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const filterTodos = (value: string, condition: string) => {
    const newTodo = todos.filter(todo => {
      if (condition === 'active') {
        return todo.title.includes(value) && !todo.completed;
      }

      if (condition === 'completed') {
        return todo.title.includes(value) && todo.completed;
      }

      return todo.title.includes(value);
    });

    setVisibleTodos(newTodo);
  };

  const select = (todoId: number) => setSelesctedTodo(todoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={filterTodos} />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    onSelect={select}
                    selectedTodo={selectedTodo}
                    todos={visibleTodos}
                  />
                )}
            </div>
            {hasLoadingError && (
              <div className="block">
                404 - Not Found
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo > 0 && (
        <TodoModal
          todo={visibleTodos.find(todo => todo.id === selectedTodo)}
          onSelect={select}
        />
      )}
    </>
  );
};
