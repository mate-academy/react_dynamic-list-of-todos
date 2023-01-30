/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toDoId, setTodoId] = useState<number>(0);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const clear = async () => {
    await setTodoId(0);
  };

  useEffect(() => {
    getTodos()
      .then(todosArr => {
        setTodos(todosArr);
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    if ((filter === 'active' && todo.completed)
    || (filter === 'completed' && !todo.completed)) {
      return false;
    }

    return todo.title.toLowerCase()
      .includes(query.toLocaleLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={toDoId}
                    selectToDo={(id: number) => setTodoId(id)}
                    clear={clear}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
