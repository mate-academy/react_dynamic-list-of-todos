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
  const [todoId, setTodoId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(false);

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const selectedTodo = todos.find(todo => todo.id === todoId);

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
              {loading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={todoId}
                    setTodoId={(id) => setTodoId(id)}
                  />
                )}
              {hasError && <h1 className="has-text-danger">Something went wrong</h1> }
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            setTodoId={setTodoId}
          />
        )}
    </>
  );
};
