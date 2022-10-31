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

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [filterSelect, setFilterSelect] = useState('all');
  const [query, setQeury] = useState('');

  useEffect(() => {
    getTodos().then(todos => {
      setVisibleTodos(todos);
    });
  }, []);

  const filteredTodos = visibleTodos
    .filter(todo => {
      switch (filterSelect) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        case 'all':
        default:
          return true;
      }
    })
    .filter(todo => {
      const lowerCaseTitle = todo.title.toLowerCase();
      const lowerQuery = query.toLowerCase();

      return lowerCaseTitle.includes(lowerQuery);
    });

  const todoById = (todoId: number) => {
    return visibleTodos.find(todo => todo.id === todoId);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterSelect={setFilterSelect}
                query={query}
                setQuery={setQeury}
              />
            </div>

            <div className="block">
              {visibleTodos.length === 0 && <Loader />}

              {visibleTodos.length > 0
                && (
                  <TodoList
                    filteredTodos={filteredTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== 0
        && (
          <TodoModal
            todo={todoById(selectedTodo) || null}
            selectTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
