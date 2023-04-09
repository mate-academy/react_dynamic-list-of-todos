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

export const App: React.FC = () => {
  const [todos, setTodos] = useState <Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const isInQuery = (arg: string) => arg.toLowerCase().includes(query.toLowerCase());

  const visibleTodos = todos.filter(todo => isInQuery(todo.title));

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
                todos.length === 0
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
