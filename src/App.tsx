/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [areTodosLoaded, setAreTodosLoaded] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setAreTodosLoaded(false);
    getTodos().then(todosFromServer => {
      setAllTodos(todosFromServer);
      setAreTodosLoaded(true);
    });
  }, []);

  const getFilteredTodos = (todosFromServer: Todo[]) => {
    let filteredTodos = [...todosFromServer];

    if (selectedFilter === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (selectedFilter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (query) {
      const normalizedQuery = query.trim().toLowerCase();

      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return filteredTodos;
  };

  const todos = getFilteredTodos(allTodos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {!areTodosLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  setIsModalShown={setIsModalShown}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalShown && (
        <TodoModal
          selectedTodo={selectedTodo}
          setIsModalShown={setIsModalShown}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
