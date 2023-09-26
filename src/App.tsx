/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';

import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { FilterOptions } from './types/FilterOptions';

import { getTodos } from './api';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [statusFilter, setStatusFilter] = useState<FilterOptions>('all');
  const [searchQwery, setSearchQwery] = useState<string>('');

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      })
      .catch(() => {
        throw new Error('An error occurred while fetching todos:');
        setIsLoading(false);
      });
  }, []);

  const displayTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (statusFilter) {
        case 'active':
          if (todo.completed) {
            return false;
          }

          break;

        case 'completed':
          if (!todo.completed) {
            return false;
          }

          break;

        default:
          break;
      }

      return todo.title.toLowerCase().includes(searchQwery.toLowerCase());
    });
  }, [searchQwery, statusFilter, todos]);

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
                titleFilter={searchQwery}
                setTitleFilter={setSearchQwery}
              />
            </div>

            <div className="block">
              {isLoading
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
