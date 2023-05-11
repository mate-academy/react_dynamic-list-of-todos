/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const filteredTodos = useMemo(() => todos
    .filter(({ title }) => (
      title.toLowerCase().includes(search.toLowerCase())
    )), [todos, search]);

  const visibleTodos = filteredTodos.filter(({ completed }) => {
    switch (filter) {
      case 'completed':
        return completed;

      case 'active':
        return !completed;

      default:
        return true;
    }
  });

  const handleFilterSelect = (filterValue: string) => {
    setFilter(filterValue);
  };

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const handleModalOpen = (selectedTodo: Todo) => {
    setTodo(selectedTodo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterSelect={handleFilterSelect}
                onSearchChange={handleSearch}
                search={search}
                filter={filter}
              />
            </div>

            <div className="block">
              {!visibleTodos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    todoId={todo?.id}
                    onOpenModal={handleModalOpen}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal
          todo={todo}
          setTodo={setTodo}
        />
      )}
    </>
  );
};
