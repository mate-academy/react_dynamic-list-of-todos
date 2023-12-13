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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  let visibleTodos = todos;

  if (searchQuery) {
    visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (filter) {
    switch (filter) {
      case 'all': {
        break;
      }

      case 'active': {
        visibleTodos = visibleTodos.filter(todo => todo.completed === false);
        break;
      }

      case 'completed': {
        visibleTodos = visibleTodos.filter(todo => todo.completed === true);
        break;
      }

      default:
        break;
    }
  }

  useEffect(
    () => {
      setIsLoading(true);
      getTodos().then(setTodos)
        // eslint-disable-next-line no-console
        .catch(console.log)
        .finally(() => (setIsLoading(false)));
    }, [],
  );

  const handleReset = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSearchQuery={setSearchQuery}
                filter={filter}
                onFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClosing={handleReset}
        />
      )}
    </>
  );
};
