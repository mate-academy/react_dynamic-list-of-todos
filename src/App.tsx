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
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setIsLoadingTodos(false));
  }, []);

  const filteredTodos = todos.filter((todo: Todo) => {
    const matchesFilter = (() => {
      switch (filterBy) {
        case FilterBy.Active:
          return !todo.completed;
        case FilterBy.Completed:
          return todo.completed;
        default:
          return true;
      }
    })();

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    return matchesFilter && matchesQuery;
  });

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleResetModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterText={setQuery}
                filterTodo={setFilterBy}
                value={query}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onTodoClick={handleSelectTodo}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleResetModal} />
      )}
    </>
  );
};
