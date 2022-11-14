/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SortType } from './types/sortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState<SortType | string>(SortType.ALL);
  const [catchErrors, setCatchErorrs] = useState(false);

  const loadedTodosFromServer = useCallback(async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoaded(true);
    } catch (error) {
      setCatchErorrs(true);
    }
  }, []);

  useEffect(() => {
    loadedTodosFromServer();
  }, []);

  const filterTodos = () => {
    const sortedTodos = todos.filter(todo => {
      switch (sortType) {
        case SortType.ACTIVE:
          return !todo.completed;
        case SortType.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    });

    const trimQuery = query.toLowerCase().trim();

    return sortedTodos.filter(todo => (
      todo.title.toLowerCase().includes(trimQuery)
    ));
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
                setQuery={setQuery}
                sortType={sortType}
                setSortType={setSortType}
              />
            </div>

            <div className="block">
              {!catchErrors && (
                isLoaded
                  ? (
                    <TodoList
                      todos={filterTodos()}
                      selectedTodo={selectedTodo}
                      setSelectedTodo={setSelectedTodo}
                    />
                  )
                  : <Loader />)}
            </div>
          </div>
        </div>
      </div>

      {!catchErrors && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
