import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum TodoStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [sortType, setSortType] = useState<TodoStatus>(TodoStatus.ALL);

  const loading = async () => {
    setTodos(await getTodos());

    setIsLoaded(true);
  };

  useEffect(() => {
    loading();
    setFilteredTodos(todos);
  }, []);

  const sortTodos = () => {
    if (filteredTodos.length > 0) {
      setIsFirstRender(false);
    }

    let filteredList;
    let toUpdate;

    switch (sortType) {
      case (TodoStatus.ACTIVE):
        filteredList = todos.filter(todo => !todo.completed);
        break;
      case (TodoStatus.COMPLETED):
        filteredList = todos.filter(todo => todo.completed);
        break;
      default:
        filteredList = todos;
    }

    if (query) {
      toUpdate = filteredList.filter(todo => todo.title.includes(query));
    } else {
      toUpdate = filteredList;
    }

    setFilteredTodos(toUpdate);
  };

  useEffect(() => {
    sortTodos();
  }, [sortType, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSortType={setSortType}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {!isLoaded && (
                <Loader />
              )}
              {isFirstRender ? (
                <TodoList todos={todos} />
              ) : (
                <TodoList todos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
