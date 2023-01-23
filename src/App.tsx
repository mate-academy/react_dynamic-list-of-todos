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
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoaded(true);
      });
  }, []);

  let visibleTodos = todos;

  if (query) {
    visibleTodos = visibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  }

  if (selectedFilter) {
    switch (selectedFilter) {
      case 'active':
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;

      case 'all':
      default:
        break;
    }
  }

  const selectedTodo = todos.find(todo => (todo.id === selectedTodoId)) || null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                onFilterSelect={setSelectedFilter}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {!isLoaded && <Loader />}

              {isLoaded && (
                <TodoList
                  todos={visibleTodos}
                  onTodoSelect={setSelectedTodoId}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          selectedTodo={selectedTodo}
          onTodoClose={setSelectedTodoId}
        />
      )}
    </>
  );
};
