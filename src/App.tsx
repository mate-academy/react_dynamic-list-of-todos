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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const filteredTodosByStatus = todos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const getFilteredTodosByQuery = (
    enteredQuery: string,
    todosList: Todo[],
  ) => {
    const normalizedQuery = enteredQuery
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .join(' ');

    return todosList.filter(
      todo => todo.title.toLowerCase().includes(normalizedQuery),
    );
  };

  const visibleTodos = getFilteredTodosByQuery(query, filteredTodosByStatus);

  const selectStatus = (value: string) => {
    setStatus(value);
  };

  const selectedTodo = visibleTodos.find(
    todo => todo.id === selectedTodoId,
  ) || null;

  const closeTodoModal = () => {
    setSelectedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectStatus={selectStatus}
                status={status}
                onFilter={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    onSelectTodoId={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={closeTodoModal} />
      )}
    </>
  );
};
