/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    getTodos().then(setTodos)
      .finally(() => setloading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} handleFilteredTodos={setFilteredTodos} />
            </div>

            <div className="block">
              {
                loading
                  ? <Loader />
                  : <TodoList todos={filteredTodos} setSelectedTodo={setSelectedTodo} selectedTodo={selectedTodo} />
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
