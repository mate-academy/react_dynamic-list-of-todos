import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(response => setTodos(response));
  }, []);

  const filterTodos = () => {
    const searchByInput = (todoTitle: string, searchInput: string) => {
      return todoTitle.toLowerCase().includes(searchInput.toLowerCase());
    };

    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.Active:
          return !todo.completed && searchByInput(todo.title, query);

        case FilterType.Completed:
          return todo.completed && searchByInput(todo.title, query);

        default:
          return searchByInput(todo.title, query);
      }
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={filterTodos()}
                    onSelect={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
