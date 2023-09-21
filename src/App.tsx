/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { FilterOption, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<FilterOption>('all');
  const [titleFilter, setTitleFilter] = useState<string>('');

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      });
  }, []);

  const displayTodos = useMemo(() => {
    return todos.filter(todo => {
      if (!todo.title.toLowerCase().includes(titleFilter.toLowerCase())) {
        return false;
      }

      if (statusFilter === 'active' && todo.completed) {
        return false;
      }

      if (statusFilter === 'completed' && !todo.completed) {
        return false;
      }

      return true;
    });
  }, [titleFilter, statusFilter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                titleFilter={titleFilter}
                setTitleFilter={setTitleFilter}
              />
            </div>

            <div className="block">
              {isLoading !== false
                ? <Loader />
                : <TodoList todos={displayTodos} handleSelectedTodo={setSelectedTodo} selectedTodo={selectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
