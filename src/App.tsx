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
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTodo = todos.find(({ id }) => id === selectedTodoId) || null;

  const closeModalWindow = () => {
    setSelectedTodoId(0);
  };

  const handleSelectionFilter = (value: string) => {
    setSelectedFilter(value);
  };

  const handleQuery = (value: string) => {
    setSearchQuery(value);
  };

  const handleSelectionTodo = (value: number) => {
    setSelectedTodoId(value);
  };

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  let visibleTodos = todos.filter(todo => {
    switch (selectedFilter) {
      case 'all':
        return true;

      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return 0;
    }
  });

  visibleTodos = visibleTodos.filter(todo => {
    const lowerTodoTitle = todo.title.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase();

    return lowerTodoTitle.includes(lowerQuery);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectionCategory={handleSelectionFilter}
                searchQuery={searchQuery}
                onQueryChange={handleQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                onTodoSelection={handleSelectionTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId
      && (
        <TodoModal
          selectedTodo={selectedTodo}
          onCloseModal={closeModalWindow}
        />
      )}
    </>
  );
};
