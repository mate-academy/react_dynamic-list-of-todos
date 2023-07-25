/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedValue, setSelectedValue] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const getSelectedTodos = (todos: Todo[]) => {
    let filteredTodos = [...todos];
    const normalizedQuery = query.trim().toLowerCase();

    if (query) {
      filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
    }

    switch (selectedValue) {
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      default:
        break;
    }

    setVisibleTodos(filteredTodos);
  };

  useEffect(() => {
    getTodos()
      .then(todos => getSelectedTodos(todos));
  }, [selectedValue, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectValue={setSelectedValue}
                selectedValue={selectedValue}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {visibleTodos.length ? (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          offSelection={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
