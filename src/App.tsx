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
import { Status } from './types/Status';

function filteredTodos(todos: Todo[], filteredStatus: string, options: string) {
  let visibleTodos = [...todos];

  if (filteredStatus !== Status.All) {
    visibleTodos = visibleTodos.filter((todo: Todo) => {
      switch (filteredStatus) {
        case Status.Active:
          return todo.completed === false;
        case Status.Completed:
          return todo.completed === true;
        default:
          return;
      }
    });
  }

  return visibleTodos.filter(todo =>
    todo.title.toLocaleLowerCase().includes(options.toLocaleLowerCase()),
  );
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [listOfTodos, setListOfTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState<string>('');
  const [filterByStatus, setFilterByStatus] = useState<string>(Status.All);

  const visibleTodos = filteredTodos(listOfTodos, filterByStatus, query);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(newValue => {
        setListOfTodos(newValue);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSelectedTodo = (selected: Todo): void => {
    setSelectedTodo(selected);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSelectedFilterByStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setFilterByStatus(event.target.value);
  };

  const handleUnselectedTodo = () => {
    setSelectedTodo(null);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onClearQuery={handleClearQuery}
                currentQuery={query}
                onSetQuery={handleQuery}
                onSelectedStatus={handleSelectedFilterByStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                listOfTodos={visibleTodos}
                onSelected={handleSelectedTodo}
                todoSelected={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal currentTodo={selectedTodo} onRemove={handleUnselectedTodo} />
      )}
    </>
  );
};
