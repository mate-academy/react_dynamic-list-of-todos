/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setQuery] = useState('');

  const filteredTodos = todos.filter(todo => {
    const lowerTitle = todo.title.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase().trim();

    return lowerTitle.includes(lowerQuery);
  });

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList todos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
