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

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const visibleTodos = (query: string, todos: Todo[], selectedFilter: Filter) => {
  const formattedQuery = query.trim().toLowerCase();

  return todos.filter((todo) => {
    const formattedTitle = todo.title.toLowerCase();
    const isTitleMatched = formattedTitle.includes(formattedQuery);

    if (selectedFilter === Filter.All) {
      return isTitleMatched;
    }

    if (selectedFilter === Filter.Active) {
      return isTitleMatched && !todo.completed;
    }

    if (selectedFilter === Filter.Completed) {
      return isTitleMatched && todo.completed;
    }

    return false;
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(error => {
        throw new Error(`Error while loading: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodoItems = visibleTodos(query, todos, selectedFilter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodoItems}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
