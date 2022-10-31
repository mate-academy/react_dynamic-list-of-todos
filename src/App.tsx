/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export enum SortType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(SortType.ALL);

  useEffect(() => {
    const loadTodos = async () => {
      const allTodos = await getTodos();

      setTodos(allTodos);
      setIsLoaded(true);
    };

    loadTodos();
  }, []);

  const onClose = () => {
    setSelectedTodo(null);
  };

  const selectTodo = (id: number | null) => {
    if (typeof id === 'number') {
      setSelectedTodo(todos[id - 1]);
    }
  };

  const visibleMovies = () => {
    let res = todos;

    if (filterBy === SortType.ACTIVE) {
      res = res.filter(todo => !todo.completed);
    }

    if (filterBy === SortType.COMPLETED) {
      res = res.filter(todo => todo.completed);
    }

    return res.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                applyQuery={setQuery}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {!isLoaded && (<Loader />)}
              {isLoaded && (
                <TodoList
                  todos={visibleMovies()}
                  setSelectedTodo={selectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {
        selectedTodo && (
          <TodoModal
            selectedTodo={selectedTodo}
            onClose={onClose}
          />
        )
      }
    </>
  );
};
