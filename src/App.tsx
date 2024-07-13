/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTasks)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTasks = tasks
    .filter(task => {
      if (statusFilter === 'completed') {
        return task.completed;
      }

      if (statusFilter === 'active') {
        return !task.completed;
      }

      return true;
    })

    .filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
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
