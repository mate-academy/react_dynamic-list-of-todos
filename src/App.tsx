/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { OptionsTodoFilter } from './types/EnumFilter';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodo, setFilterTodo] = useState('all');
  const [loading, setLoading] = useState(false);
  const [todoId, setTodoId] = useState(0);
  const [queryFilter, setQueryFilter] = useState('');

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
        setLoading(false);
      });
  }, []);

  const visibleTodos = todos
    .filter(todo => {
      switch (filterTodo) {
        case OptionsTodoFilter.All:
          return todo;

        case OptionsTodoFilter.Active:
          return !todo.completed;

        case OptionsTodoFilter.Completed:
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
                value={filterTodo}
                setValue={setFilterTodo}
                query={queryFilter}
                setQuery={setQueryFilter}
              />
            </div>

            <div className="block">
              {loading
                ? <Loader />
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
