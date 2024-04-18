import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';

import { FilterEnum } from './types/FilterEnum';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<FilterEnum>('all');
  const [titleFilter, setTitleFilter] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        throw new Error(e);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    let newTodos = [...todos];

    switch (statusFilter) {
      case 'active':
        newTodos = newTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        newTodos = newTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (titleFilter !== '') {
      newTodos = newTodos.filter(todo =>
        todo.title.toLowerCase().includes(titleFilter.toLowerCase()),
      );
    }

    return newTodos;
  }, [todos, statusFilter, titleFilter]);

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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
