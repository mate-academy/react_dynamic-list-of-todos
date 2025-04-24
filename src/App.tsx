/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterQuery } from './types/filterQuery';
import { FilterStatus } from './types/filterStatus';

const defaultValues: FilterQuery = {
  status: FilterStatus.All,
  search: '',
};

const getFilteredTodo = (todos: Todo[], query: FilterQuery) => {
  if (query.status === FilterStatus.All && query.search.trim() === '') {
    return todos;
  }

  return todos.filter(
    todo =>
      (query.status === FilterStatus.All ||
        todo.completed === (query.status === FilterStatus.Completed)) &&
      (query.search.trim() === '' ||
        todo.title
          .toLocaleLowerCase()
          .includes(query.search.toLocaleLowerCase())),
  );
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [filterQuery, setFilterQuery] = React.useState(defaultValues);

  useEffect(() => {
    getTodos().then(serverTodos => {
      setTodos(serverTodos);
      setFilteredTodos(getFilteredTodo(serverTodos, filterQuery));
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setFilteredTodos(getFilteredTodo(todos, filterQuery));
  }, [todos, filterQuery]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter {...{ filterQuery, setFilterQuery }} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo ? (
        <TodoModal {...{ selectedTodo, onClose: handleModalClose }} />
      ) : null}
    </>
  );
};
