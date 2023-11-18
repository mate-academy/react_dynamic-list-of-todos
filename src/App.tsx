/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useFilter } from './hooks/useFilter';
import { Todo } from './types/Todo';
import { todosFilter } from './services/todosFilter';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const filter = useFilter();

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              {
                todos.length !== 0
                && (
                  <TodoList
                    todos={todosFilter(todos, filter)}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {
        selectedTodo !== null
        && (<TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />)
      }
    </>
  );
};
