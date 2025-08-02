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
import { Status } from './types/Status';

function getFilteredTodos(todos: Todo[], query: string, status: Status) {
  let filteredTodos = [...todos];

  if (status) {
    switch (status) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => {
      const normalizedQuery = query.trim().toLowerCase();
      const normalizedTodo = todo.title.trim().toLowerCase();

      return normalizedTodo.includes(normalizedQuery);
    });
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusSelect, setStatusSelect] = useState<Status>(Status.all);
  // const [curre]
  const filteredTodos = getFilteredTodos(todos, query, statusSelect);

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleViewingClose = () => {
    setSelectedTodo(null);
  };

  const handleNewStatus = (newStatus: Status) => {
    setStatusSelect(newStatus);
  };

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos: </h1>
            <div className="block">
              <TodoFilter
                statusSelect={statusSelect}
                onSelect={handleNewStatus}
                query={query}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onTodoSelected={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo ? (
        <TodoModal
          selectedTodo={selectedTodo}
          onViewingClose={handleViewingClose}
        />
      ) : (
        ''
      )}
    </>
  );
};
