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
import { GroupBy } from './types/GroupBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(todos[0]);

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(response => {
      setTodos(response);
      setVisibleTodos(response);
    }).finally(() => setIsLoading(false));
  }, []);

  const filterTodos = (groupBy: string, query: string) => {
    setVisibleTodos(
      todos.filter(todo => {
        switch (groupBy) {
          case GroupBy.Active:
            return !todo.completed;
          case GroupBy.Completed:
            return todo.completed;

          default:
            return true;
        }
      }).filter(todo => (
        todo.title.toLowerCase().includes(query.toLocaleLowerCase())
      )),
    );
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filterTodos={filterTodos} />
            </div>

            <div className="block">
              {!isLoading ? (
                <TodoList
                  todos={visibleTodos}
                  setTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} setTodo={setSelectedTodo} />}
    </>
  );
};
