/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(setTodos).finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <h1 className="title">Todos:</h1>

        <div className="block">
          <TodoFilter
            todos={todos}
            setFilteredTodos={setFilteredTodos}
          />
        </div>

        <div className="block">
          {isLoading
            ? (<Loader />)
            : (
              <TodoList
                todos={filteredTodos}
                activeTodo={activeTodo}
                setActiveTodo={setActiveTodo}
              />
            )}
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          setActiveTodo={setActiveTodo}
        />
      )}
    </>
  );
};
