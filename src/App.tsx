/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);

  useEffect(() => {
    try {
      getTodos()
        .then(todosFromServer => {
          setTodos(todosFromServer);
          setIsLoading(true);
        });
    } catch {
      throw new Error('There are not todos');
    }
  }, []);

  const handleValue = (value: string) => (
    value.toLowerCase().includes(query.toLowerCase())
  );

  const visibleTodos = useMemo(() => {
    const filteredTodos = todos.filter(todo => {
      handleValue(todo.title);

      switch (filterType) {
        case FilterType.ACTIVE:
          return !todo.completed && handleValue(todo.title);

        case FilterType.COMPLETED:
          return todo.completed && handleValue(todo.title);

        default:
          return handleValue(todo.title);
      }
    });

    return filteredTodos;
  }, [todos, filterType, query]);

  const setClearQuery = () => setSelectedTodo(null);

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
              {isLoading ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setNullInsteadTodo={setClearQuery}
        />
      )}
    </>
  );
};
