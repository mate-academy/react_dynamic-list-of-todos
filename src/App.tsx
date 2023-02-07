/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [isLoading, setIsLoading] = useState(false);

  const onInputQuery = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  const onClearInput = () => setQuery('');

  const visibleTodos = filteredTodos.filter(todo => {
    const lowerTitle = todo.title.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase().trim();

    return lowerTitle.includes(lowerQuery);
  });

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onSelectTodos = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                onInputQuery={onInputQuery}
                onSelectTodos={onSelectTodos}
                onClearInput={onClearInput}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList visibleTodos={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
