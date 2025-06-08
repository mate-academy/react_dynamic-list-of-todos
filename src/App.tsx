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
import { FilterType } from './enums/FilterType';

type FilterOptions = {
  query: string;
  filterType: FilterType;
};

const getFilteredTodos = (
  todos: Todo[],
  { query, filterType }: FilterOptions,
) => {
  let filteredTodos = [...todos];

  if (query !== '') {
    const normalizedQuery = query.trim().toLowerCase();

    filteredTodos = todos.filter(todo => {
      return todo.title.toLowerCase().includes(normalizedQuery);
    });
  }

  if (filterType === FilterType.Active) {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (filterType === FilterType.Completed) {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalShown, setIsModalShown] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsTodosLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, { query, filterType });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                query={query}
                setFilterType={setFilterType}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setIsModalShown={setIsModalShown}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalShown && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          setIsModalShown={setIsModalShown}
        />
      )}
    </>
  );
};
