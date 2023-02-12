/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRejectResponse, setHasRejectResponse] = useState(false);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);

  useEffect(() => {
    const onLoadGetTodos = async () => {
      try {
        const allTodos = await getTodos();

        setTodos(allTodos);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHasRejectResponse(true);
      }
    };

    onLoadGetTodos();
  }, []);

  const handleFilterTodos = useCallback(() => {
    let allTodos = todos.filter(todo => {
      switch (filterBy) {
        case FilterBy.ACTIVE:
          return !todo.completed;
        case FilterBy.COMPLETE:
          return todo.completed;
        default:
          return true;
      }
    });

    if (query) {
      allTodos = allTodos.filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return allTodos;
  }, [query, filterBy, todos]);

  const visibleTodos = handleFilterTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterBy={filterBy}
                onChangeQuery={setQuery}
                onChangeFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {hasRejectResponse
                      ? <p>Error loading todos, please reload page</p>
                      : (
                        <TodoList
                          todos={visibleTodos}
                          onSelectTodo={setSelectedTodo}
                          selectedTodo={selectedTodo}
                        />
                      )}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo !== null && (
        <TodoModal selectedTodo={selectedTodo} onCloseModal={setSelectedTodo} />
      )}
    </>
  );
};
