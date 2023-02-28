import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { preparingTodos } from './utils';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    const data = await getTodos();

    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const filterTodos = useCallback((selection: string) => {
    switch (selection) {
      case 'all':
      default:
        setFilterBy(FilterBy.All);
        break;
      case 'active':
        setFilterBy(FilterBy.Active);
        break;
      case 'completed':
        setFilterBy(FilterBy.Completed);
        break;
    }
  }, []);

  const changeQuery = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const resetQuery = useCallback(() => {
    setQuery('');
  }, []);

  const visibleTodos = preparingTodos(todos, filterBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodos={filterTodos}
                query={query}
                changeQuery={changeQuery}
                resetQuery={resetQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={visibleTodos}
                    openModal={openModal}
                    selectedTodo={selectedTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          openModal={openModal}
        />
      )}

    </>
  );
};
