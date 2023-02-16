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
import { FilterBy, filterTodo } from './utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [query, setQuery] = useState('');

  const selectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const visibleTodo = filterTodo(todos, filterBy, query);

  useEffect(() => {
    getTodos().then(result => {
      setTodos(result);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} filterBy={filterBy} setFilterBy={setFilterBy} setQuery={setQuery} />
            </div>

            <div className="block">
              {
                isLoading
                  ? <Loader />
                  : <TodoList todos={visibleTodo} selectTodo={selectTodo} selectedTodo={selectedTodo} />
              }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal todo={selectedTodo} selectTodo={selectTodo} />}
    </>
  );
};
