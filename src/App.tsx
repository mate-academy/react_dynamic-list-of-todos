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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const [statusFilter, setStaustFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(newTodos => {
        setTodos(newTodos);
        setIsTodosLoading(false);
      })
      .catch(() => {
        setIsTodosLoading(false);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(
      todo =>
        todo.title.toLowerCase().includes(query.toLowerCase().trim()) &&
        (statusFilter === 'all' ||
          (statusFilter === 'active' && !todo.completed) ||
          (statusFilter === 'completed' && todo.completed)),
    );
  }, [statusFilter, query, todos]);

  const handleModelClose = () => {
    setSelectedTodo(undefined);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeStatusFilter={setStaustFilter}
                statusFilter={statusFilter}
                onChangeQuery={setQuery}
                query={query}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onTodoItemClick={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id || -1}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleModelClose} />
      )}
    </>
  );
};
