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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.ALL);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const loadTodosFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as TodoStatus);
  };

  const resetQuery = () => setQuery('');

  const includeQueryCheck = (item: string) => item.toLowerCase()
    .includes(query.toLowerCase());

  const todoCheck = (todo: Todo) => {
    const todoTitleCheck = includeQueryCheck(todo.title);
    const todoIdCheck = todo.id === +query;

    return todoTitleCheck || todoIdCheck;
  };

  const visibleTodos = todos
    .filter(todo => todoCheck(todo))
    .filter(todo => {
      switch (status) {
        case 'all':
          return todo;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    });

  const queryHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setQuery(event.target.value);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                resetQuery={resetQuery}
                handleQuery={queryHandler}
                handleStatus={handleStatus}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            setSelectedTodo={setSelectedTodo}
            selectedTodo={selectedTodo}
          />
        )}
    </>
  );
};
