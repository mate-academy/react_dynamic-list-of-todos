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
import { FilterField } from './types/FilterField';

const filterTodos = (
  todos: Todo[],
  query: string,
  filterField: FilterField,
) => {
  let resultTodods = [...todos];

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    resultTodods = resultTodods.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  switch (filterField) {
    case FilterField.ALL:
      break;
    case FilterField.ACTIVE:
      resultTodods = resultTodods.filter(todo => !todo.completed);
      break;
    case FilterField.COMPLETED:
      resultTodods = resultTodods.filter(todo => todo.completed);
  }

  return resultTodods;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filterField, setFilterField] = useState<FilterField>(FilterField.ALL);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = filterTodos(todos, query, filterField);

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
                filterField={filterField}
                setFilterField={setFilterField}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
