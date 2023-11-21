/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/Filter';
import { TodoModal } from './components/TodoModal/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterBy.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  function getVisibleTodo(tasks: Todo[], filterOption: FilterBy, searchInput: string) {
    return tasks
      .filter(todo => {
        switch (filterOption) {
          case (FilterBy.ACTIVE):
            return !todo.completed;

          case (FilterBy.COMPLETED):
            return todo.completed;

          default:
            return todo;
        }
      })
      .filter(todo => todo.title
        .toLocaleLowerCase()
        .includes(searchInput.trim().toLocaleLowerCase()));
  }

  const visibleTodos = getVisibleTodo(todos, filter, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <h1 className="title">{filter}</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilter={setFilter}
              />
            </div>

            <div className="block">

              {loading && (<Loader />)}

              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo?.id}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
