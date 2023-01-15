/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch (error) {
        setTodos([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const filterTodos = () => {
    return todos.filter(todo => {
      const title = todo.title.toLowerCase();
      const normalizeQuery = query.trim().toLowerCase();
      const isTitleIncludesQuery = title.includes(normalizeQuery);

      switch (filterStatus) {
        case 'completed':
          return todo.completed && isTitleIncludesQuery;

        case 'active':
          return !todo.completed && isTitleIncludesQuery;

        default:
          return isTitleIncludesQuery;
      }
    });
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);
  const visibleTodos = filterTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterStatus={filterStatus}
                onInputChange={setQuery}
                onSelectChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onChange={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onChange={setSelectedTodoId}
        />
      )}
    </>
  );
};
