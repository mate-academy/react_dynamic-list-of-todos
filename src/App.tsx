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

const prepareTodos = (todos: Todo[], filterParam: string, query: string) => {
  const preparedTodos = todos;

  return preparedTodos
    .filter(item => {
      return filterParam !== 'all'
        ? filterParam === 'active'
          ? item.completed === false
          : filterParam === 'completed'
            ? item.completed === true
            : true
        : true;
    })
    .filter(item => {
      return query
        ? item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        : true;
    });
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [filterParam, setFilterParam] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(todos => setVisibleTodos(prepareTodos(todos, filterParam, query)))
      .catch()
      .finally(() => setLoading(false));
  }, [filterParam, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChoose={param => setFilterParam(param)}
                onType={param => setQuery(param)}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  todoId={todoId}
                  onClick={id => setTodoId(id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todo={visibleTodos.find(item => item.id === todoId)}
          onClose={() => setTodoId(0)}
        />
      )}
    </>
  );
};
