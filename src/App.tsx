/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos()
      .then(gettingTodos => setTodos(gettingTodos));
  }, []);

  const handleSelection = useCallback((selectedTodoId: number) => {
    const foundTodo = todos.find(todo => todo.id === selectedTodoId);

    if (foundTodo) {
      setSelectedTodo(foundTodo);
    }
  }, [todos, selectedTodo]);

  const closeModal = useCallback(() => {
    setSelectedTodo(null);
  }, [todos, selectedTodo]);

  const filteredTodos = todos.filter(todo => {
    const filteredByQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (status) {
      case 'active':
        return filteredByQuery && !todo.completed;
      case 'completed':
        return filteredByQuery && todo.completed;
      default:
        return filteredByQuery;
    }
  });

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
                onChangeStatus={setStatus}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={handleSelection}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            closeModal={closeModal}
          />
        )}
    </>
  );
};
