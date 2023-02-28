/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { FilterTodos } from './types/FilterTodos';

const filterTodos:FilterTodos = (todos, query, todoStatus) => {
  let prepearedTodos = [...todos];

  if (query.trim()) {
    const normalizedQuery = query.toLowerCase().trim();

    prepearedTodos = prepearedTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  prepearedTodos = prepearedTodos.filter(todo => {
    switch (todoStatus) {
      case TodoStatus.Active:
        return !todo.completed;

      case TodoStatus.Completed:
        return todo.completed;

      case TodoStatus.All:
      default:
        return true;
    }
  });

  return prepearedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.All);
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getTodosFromServer = async () => {
    setIsLoading(true);
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const defineStatus = (value:TodoStatus) => {
    setTodoStatus(value);
  };

  const getQuery = (value:string) => {
    setQuery(value);
  };

  const defineSelectedId = (value: number) => {
    setSelectedTodoId(value);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = filterTodos(todos, query, todoStatus);
  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              status={todoStatus}
              defineStatus={defineStatus}
              query={query}
              getQuery={getQuery}
            />
          </div>

          <div className="block">
            {isLoading
              ? <Loader />
              : (
                <TodoList
                  todos={visibleTodos}
                  defineSelectedId={defineSelectedId}
                  selectedTodoId={selectedTodoId}
                />
              )}
            {hasError && (
              <p>Couldn`t load todos</p>
            )}
          </div>

        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          defineSelectedId={defineSelectedId}
          selectedTodo={selectedTodo}
        />
      )}
    </div>
  );
};
