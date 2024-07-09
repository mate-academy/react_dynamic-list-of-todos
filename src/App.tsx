/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { filterByStatus, todoMatchesQuery } from './services';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = todos.filter(
    (todo: Todo) =>
      todoMatchesQuery(query, todo.title) &&
      filterByStatus(todo.completed, filterBy),
  );

  function handleSelectTodo(todo: Todo) {
    setSelectedTodo(todo);
  }

  function handleResetModal() {
    setSelectedTodo(null);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                setFilterBy={setFilterBy}
                value={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  handleSelectTodo={handleSelectTodo}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} handleResetModal={handleResetModal} />
      )}
    </>
  );
};
