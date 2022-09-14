/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setTodos={setVisibleTodos} />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={(id) => setSelectedTodoId(id)}
                  />
                )}
              {hasError && <h1 className="has-text-danger">Something went wrong</h1> }
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            setSelectedTodoId={setSelectedTodoId}
          />
        )}
    </>
  );
};
