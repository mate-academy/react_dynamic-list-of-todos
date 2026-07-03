import React, { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filterTitle, setFilterTitle] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesTitle = todo.title
      .toLowerCase()
      .includes(filterTitle.toLowerCase());

    if (filterStatus === 'active') {
      return matchesTitle && !todo.completed;
    }

    if (filterStatus === 'completed') {
      return matchesTitle && todo.completed;
    }

    return matchesTitle;
  });

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title is-3">Dynamic List of Todos</h1>

          <div className="block">
            <TodoFilter
              query={filterTitle}
              onQueryChange={setFilterTitle}
              status={filterStatus}
              onStatusChange={setFilterStatus}
            />
          </div>

          <div className="block">
            {isLoading ? (
              <Loader />
            ) : (
              <TodoList
                todos={filteredTodos}
                selectedTodoId={selectedTodo?.id || null}
                onSelectTodo={setSelectedTodo}
                onClearSelection={() => setSelectedTodo(null)}
              />
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </div>
  );
};
