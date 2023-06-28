/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterStatus>(FilterStatus.ALL);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoaded(true);
      });
  }, []);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const changeQuery = (value: string) => {
    setQuery(value);
  };

  const selectFilter = (todoStatus: FilterStatus) => {
    setFilterBy(todoStatus);
  };

  const visibleTodos = todos.filter((todo) => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedTodo = todo.title.trim().toLowerCase();

    const isTodoIncluded = normalizedTodo.includes(normalizedQuery);

    let isStatusMatch: boolean;

    switch (filterBy) {
      case FilterStatus.ACTIVE:
        isStatusMatch = !todo.completed;
        break;

      case FilterStatus.COMPLETED:
        isStatusMatch = todo.completed;
        break;

      default:
        isStatusMatch = true;
    }

    return isTodoIncluded && isStatusMatch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                query={query}
                status={filterBy}
                onChangeQuery={changeQuery}
                onSelectFilter={selectFilter}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelect={selectTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={clearSelectedTodo}
        />
      )}
    </>
  );
};
