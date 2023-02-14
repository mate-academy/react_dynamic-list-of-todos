/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  const filterTodos = () => {
    const filteredTodos = todos.filter(todo => {
      const doesIncludeQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (filterType) {
        case FilterType.ACTIVE:
          return !todo.completed && doesIncludeQuery;

        case FilterType.COMPLETED:
          return todo.completed && doesIncludeQuery;

        default:
          return doesIncludeQuery;
      }
    });

    return filteredTodos;
  };

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoaded(true);
    } catch {
      throw new Error('Todos are not found');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

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
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={filterTodos()}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                ) : (
                  <Loader />
                )}
            </div>

          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
