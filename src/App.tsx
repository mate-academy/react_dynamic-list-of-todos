/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.All);

  useEffect(() => {
    setIsLoaded(true);

    getTodos()
      .then(todo => {
        setTodos(todo);
      })
      .finally(() => {
        setIsLoaded(false);
      });
  }, []);

  const visibleTodos = todos.filter((todo) => {
    const normalizedQuery = todo.title.toLowerCase().trim()
      .includes(query.toLowerCase().trim());

    switch (status) {
      case TodoStatus.All:
        return todo && normalizedQuery;

      case TodoStatus.Completed:
        return todo.completed && normalizedQuery;

      case TodoStatus.Active:
        return !todo.completed && normalizedQuery;

      default:
        throw new Error(`Wrong filter, ${setStatus} is not defined`);
    }
  });

  const getCurrentTodo = (id: number) => {
    return visibleTodos.find(todo => todo.id === id) || null;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setTodoFilter={setStatus}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    currentTodoId={currentTodoId}
                    setCurrentTodoId={setCurrentTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodoId && (
        <TodoModal
          currentTodo={getCurrentTodo(currentTodoId)}
          setCurrentTodoId={setCurrentTodoId}
        />
      )}
    </>
  );
};
