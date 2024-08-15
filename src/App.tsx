import React, { useCallback, useState, useMemo, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.All,
  );

  const displayedTodos = useMemo(() => {
    return todosFromServer
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
      .filter(todo => {
        switch (statusFilter) {
          case StatusFilter.All:
            return true;

          case StatusFilter.Active:
            return !todo.completed;

          case StatusFilter.Completed:
            return todo.completed;
        }
      });
  }, [todosFromServer, query, statusFilter]);

  const onTodoSelect = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  useEffect(() => {
    setIsTodoListLoading(true);

    getTodos()
      .then(setTodosFromServer)
      .finally(() => setIsTodoListLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </div>

            <div className="block">
              {isTodoListLoading ? (
                <Loader />
              ) : (
                <TodoList
                  displayedTodos={displayedTodos}
                  selectedTodo={selectedTodo}
                  onSelect={onTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={setSelectedTodo} />
      )}
    </>
  );
};
