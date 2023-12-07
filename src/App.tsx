/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/FilterBy';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(Filter.All);

  useEffect(() => {
    getTodos()
      .then(setVisibleTodos);
  }, []);

  const filterTodos: Todo[] = useMemo(() => {
    let filteredToods = [...visibleTodos];

    if (query) {
      filteredToods = filteredToods.filter(todo => (todo.title.toLowerCase().includes(query.toLowerCase())
      ));
    }

    switch (filterBy) {
      case Filter.Completed:
        return filteredToods.filter(todo => todo.completed);

      case Filter.Active:
        return filteredToods.filter(todo => !todo.completed);

      default:
        return filteredToods;
    }
  }, [visibleTodos, query, filterBy]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeFilter={setFilterBy}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {!visibleTodos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos}
                  selectTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
