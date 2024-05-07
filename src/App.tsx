/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const filteredTodos: Todo[] = todos.filter(todo => {
    const normTitle = todo.title.trim().toLowerCase();
    const normQuery = query.trim().toLowerCase();

    return normTitle.includes(normQuery);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setTodos={setTodos}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              <Loader />
              <TodoList todos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
