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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [todoId, setTodoId] = useState(0);

  useEffect(() => {
    getTodos()
      .then(todo => {
        setTodos(todo);
        setLoader(true);
      });
  }, []);

  const filterTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':

        return todo.completed;
      case 'active':

        return !todo.completed;

      default:
        return todo;
    }
  });

  const serchTodos = filterTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                filter={filter}
                setCurentFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!loader
                ? <Loader />
                : (
                  <TodoList
                    todos={(query === '')
                      ? filterTodos
                      : serchTodos}
                    todoId={todoId}
                    setTodoId={(todo) => setTodoId(todo)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todos={(query === '')
            ? filterTodos
            : serchTodos}
          selectedUserId={todoId}
          selectUser={(todo) => {
            setTodoId(todo);
          }}
        />
      )}
    </>
  );
};
