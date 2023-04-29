/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(
        setTodos,
        setFilteredTodos,
      );
  }, []);

  const filteredByStatus = (todosFromServer: Todo[], StateStatus: string) => {
    switch (StateStatus) {
      case 'all':
        setFilteredTodos(todosFromServer);
        break;
      case 'active':
        setFilteredTodos(todosFromServer.filter((todo) => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(todosFromServer.filter((todo) => todo.completed));
        break;
      default:
        break;
    }
  };

  const filterByQuery = (todosByStatus: Todo[], queryFromInput: string) => {
    if (!queryFromInput) {
      return todosByStatus;
    }

    return todosByStatus.filter(todo => todo.title.includes(queryFromInput.toLowerCase().trim()));
  };

  const handleTodoSelected = (todo: Todo | null): void => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    filteredByStatus(filterByQuery(todos, query), status);
  }, [status, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                onStatusChanged={(event) => setStatus(event.target.value)}
                onQueryChanged={(event) => setQuery(event.target.value)}
                onClearInput={() => setQuery('')}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todoId={selectedTodo?.id}
                    onTodoSelected={handleTodoSelected}
                    todos={filteredTodos}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {
        selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            onClearModal={() => setSelectedTodo(null)}
          />
        )
      }
    </>
  );
};
