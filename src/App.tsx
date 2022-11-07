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
import { Status } from './types/Status';

type GetTodos = () => Promise<void>;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosAreLoading, setTodosAreLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const getTodosFromServer: GetTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (e) {
      throw new Error('Can not load todos');
    }

    setTodosAreLoading(false);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const onTodoSelected = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const onResetSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const handleSetQuery = (value: string) => {
    setQuery(value);
  };

  const handleSetStatus = (value: string) => {
    setStatus(value);
  };

  const doesTitleMatch = (todo: Todo) => (
    todo.title.toLowerCase().includes(query.toLowerCase().trim()));

  const doesStatusMatch = (todo: Todo) => {
    switch (status) {
      case Status.Completed:
        return todo.completed === true;
      case Status.Active:
        return todo.completed === false;

      default:
        return Status.All;
    }
  };

  const visiableTodos = todos
    .filter(todo => doesTitleMatch(todo) && doesStatusMatch(todo));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSetQuery={handleSetQuery}
                handleSetStatus={handleSetStatus}
                status={status}
              />
            </div>

            <div className="block">
              {todosAreLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visiableTodos}
                    onTodoSelected={onTodoSelected}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onResetSelectedTodo={onResetSelectedTodo}
        />
      )}
    </>
  );
};
