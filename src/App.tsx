/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Status.all);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const filterTodosByStatus = (statusTodos: Todo[], status: Status) => {
    switch (status) {
      case Status.all:
        return statusTodos;
      case Status.completed:
        return statusTodos.filter(todo => todo.completed);
      case Status.active:
        return statusTodos.filter(todo => !todo.completed);
      default:
        return statusTodos;
    }
  };

  const filterTodosByQuery = (queryTodos: Todo[], givenQuery: string) => {
    return queryTodos.filter(todo => todo.title.toLowerCase().includes(givenQuery.toLowerCase()));
  };

  const displayedTodos = useMemo(() => {
    const todosByStatus = filterTodosByStatus(todos, filter);
    const todosByQuery = filterTodosByQuery(todosByStatus, query);

    return todosByQuery;
  }, [todos, filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} setQuery={setQuery} setFilter={setFilter} />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList todo={displayedTodos} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      { selectedTodo
      && <TodoModal selectedTodo={selectedTodo} handleCloseModal={handleCloseModal} />}
    </>
  );
};
