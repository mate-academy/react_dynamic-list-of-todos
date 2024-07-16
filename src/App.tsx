/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTasks = todos
    .filter(todo => {
      if (statusFilter === 'completed') {
        return todo.completed;
      }

      if (statusFilter === 'active') {
        return !todo.completed;
      }

      return true;
    })

    .filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={statusFilter}
                onFilterStatus={setStatusFilter}
                query={searchQuery}
                onQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTasks}
                  selectedTodo={activeTodo}
                  onSelectedTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          selectedTodo={activeTodo}
          onCloseSelectedTodo={() => setActiveTodo(null)}
        />
      )}
    </>
  );
};
