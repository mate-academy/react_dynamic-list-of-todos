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

function filteredTodos(todos: Todo[], query: string, filterBy: string) {
  let filteredArr = [...todos];

  if (filterBy !== 'all') {
    switch (filterBy) {
      case 'active':
        filteredArr = filteredArr.filter(todo => todo.completed === false);
        break;

      case 'completed':
        filteredArr = filteredArr.filter(todo => todo.completed === true);
        break;

      default:
        break;
    }
  }

  if (query) {
    filteredArr = filteredArr.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filteredArr;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const visibleTodos = filteredTodos(todos, query, filterBy);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
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
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  isShown={isShown}
                  setIsShown={setIsShown}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isShown={isShown}
        setIsShown={setIsShown}
        selectedTodo={selectedTodo}
      />
    </>
  );
};
