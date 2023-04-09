/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList, StatusOfFilter } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { isInQuery } from './helpers/is-in-query';

export const App: React.FC = () => {
  const [todos, setTodos] = useState <Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [status, setStatus] = useState<StatusOfFilter | string>(StatusOfFilter.All);
  const [query, setQuery] = useState('');

  const visibleTodos = todos.filter(todo => isInQuery(todo.title, query));

  const handleChange = (value: string) => {
    setStatus(value);
  };

  useEffect(() => {
    getTodos().then(myTodos => setTodos(myTodos));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                handleChange={handleChange}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {
                !todos.length
                  ? <Loader />
                  : (
                    <TodoList
                      todos={visibleTodos}
                      fnSelectTodo={(selectTodoId) => setTodoId(selectTodoId)}
                      selectTodoId={todoId}
                      fnSelectUser={(selectUserId) => setUserId(selectUserId)}
                      status={status}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {!!todoId && (
        <TodoModal
          userId={userId}
          todoId={todoId}
          fnSelectTodo={(selectTodoId) => setTodoId(selectTodoId)}
        />
      )}
    </>
  );
};
