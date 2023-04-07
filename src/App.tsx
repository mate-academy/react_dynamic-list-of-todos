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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [filterValue, setFilterValue] = useState('all');
  const [queryFilter, setQueryFilter] = useState('');

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = todos
    .filter(todo => {
      switch (filterValue) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    })
    .filter(todo => {
      return todo.title.toLowerCase().includes(queryFilter.toLowerCase());
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                value={filterValue}
                setValue={setFilterValue}
                query={queryFilter}
                setQuery={setQueryFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={todoId}
                    selectTodo={todo => setTodoId(todo)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todoId={todoId}
          todos={visibleTodos}
          selectTodo={todo => setTodoId(todo)}
        />
      )}
    </>
  );
};
