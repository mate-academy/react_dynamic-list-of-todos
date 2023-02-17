/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodos();

      setTodos(data);
    };

    fetchData();
  }, []);

  const openModal = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const filterTodos = useCallback((selection: string) => {
    setFilterBy(selection);
  }, []);

  const changeQuery = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const resetQuery = useCallback(() => {
    setQuery('');
  }, []);

  let visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'all':
      default:
        return [];
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
    }
  });

  if (query) {
    visibleTodos = [...visibleTodos].filter(todo => todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  }

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

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} openModal={openModal} />}

    </>
  );
};
