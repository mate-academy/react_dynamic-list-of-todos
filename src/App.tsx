/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchType, setSearchType] = useState('all');
  const [query, setQuery] = useState('');

  const formattedQuery = query.trim().toLowerCase();

  const filter = (type: string) => {
    const findQuery = (queryToSearch: string, todos: Todo[]) => {
      return todos.filter((todo) => (
        todo.title.toLowerCase().includes(queryToSearch)
      ));
    };

    switch (type) {
      case 'all':
        return findQuery(formattedQuery, initialTodos);

      case 'active': {
        const activeTodos = initialTodos.filter((todo) => !todo.completed);

        return findQuery(formattedQuery, activeTodos);
      }

      case 'completed': {
        const completedTodos = initialTodos.filter((todo) => todo.completed);

        return findQuery(formattedQuery, completedTodos);
      }

      default: return initialTodos;
    }
  };

  const fetchGoods = () => (
    getTodos()
      .then((todo) => setInitialTodos(todo))
      .catch(() => 'An error occured when loading todos'));

  useEffect(() => {
    fetchGoods();
  }, []);

  const filteredTodos = useMemo(() => {
    return filter(searchType);
  }, [searchType, initialTodos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSearchType={setSearchType}
                setQuery={setQuery}
                query={query}
              />
            </div>

            {initialTodos.length > 0 ? (
              <div className="block">
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              </div>
            ) : (<Loader />)}
          </div>
        </div>
      </div>

      {!!selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
