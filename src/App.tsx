/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { SortBy } from './types/SortBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>();
  const [sortBy, setSortBy] = useState(SortBy.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(data => setTodos(data));
  }, []);

  const handleSelectBtn = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCross = () => {
    setSelectedTodo(null);
  };

  const handleSelectFilter = (value: SortBy) => {
    setSortBy(value);
  };

  const handleInputFilter = (value: string) => {
    setQuery(value);
  };

  const handleClearInputBtn = () => {
    setQuery('');
    console.log(query);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={handleSelectFilter}
                onInput={handleInputFilter}
                query={query}
                onCross={handleClearInputBtn}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  listOfTodos={todos}
                  onSelect={handleSelectBtn}
                  sortBy={sortBy}
                  query={query}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          list={todos}
          onCross={handleCross}
          todo={selectedTodo}
          getUser={getUser}
        />
      )}
    </>
  );
};
