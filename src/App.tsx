/* eslint-disable max-len */
import React, { useMemo, useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

export type FilterBy = 'all' | 'completed' | 'active';

const filterTodos = (
  todos: Todo[],
  filterBy: FilterBy,
  query: string,
): Todo[] => {
  return [...todos]?.filter(todo => {
    const normalizeQuery = query.trim().toLowerCase();

    if (filterBy === 'active' || filterBy === 'completed') {
      return filterBy === 'active'
        ? todo.completed === false &&
            todo.title.toLowerCase().includes(normalizeQuery)
        : todo.completed === true &&
            todo.title.toLowerCase().includes(normalizeQuery);
    }

    return todo.title.toLowerCase().includes(normalizeQuery);
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setIsLoading(false);
    });
  }, []);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filterBy, query);
  }, [todos, filterBy, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onClick={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={setSelectedTodo} />
      )}
    </>
  );
};
