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

type Filter = 'all' | 'completed' | 'active';

export const App: React.FC = () => {
  const [showedTodos, setShowedTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  function getFilteredTodos(
    todos: Todo[],
    query: string,
    filter: Filter,
  ): Todo[] {
    let filteredTodos = [...todos];

    if (query.length > 0) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (filter === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    return filteredTodos;
  }

  useEffect(() => {
    setLoaderVisible(true);

    getTodos()
      .then(setShowedTodos)
      .finally(() => setLoaderVisible(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
              />
            </div>

            <div className="block">
              {loaderVisible && <Loader />}
              <TodoList
                showedTodos={getFilteredTodos(
                  showedTodos,
                  searchQuery,
                  selectedFilter,
                )}
                selectedTodo={selectedTodo}
                onTodoSelect={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
