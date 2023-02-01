import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<boolean | null>(null);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleTodoSelection = (pickedTodo: Todo | null) => {
    setSelectedTodo(pickedTodo);
  };

  const filterByStatus = (option: string) => {
    switch (option) {
      case Status.Active:
        setStatus(false);
        break;

      case Status.Completed:
        setStatus(true);
        break;

      case Status.All:
      default:
        setStatus(null);
    }
  };

  const handleModalClosing = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const filterByQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  let filteredTodos = [...todos];

  if (status !== null) {
    filteredTodos = filteredTodos
      .filter(todoStatus => todoStatus.completed === status);
  }

  if (query.trim() !== '') {
    const lowerQuery = query.toLocaleLowerCase().trim();

    filteredTodos = filteredTodos
      .filter(todoQuery => todoQuery.title.toLowerCase()
        .trim().includes(lowerQuery));
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={filterByStatus}
                filterByQuery={filterByQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length !== 0
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    onTodoSelection={handleTodoSelection}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handleModalClosing}
        />
      )}
    </>
  );
};
