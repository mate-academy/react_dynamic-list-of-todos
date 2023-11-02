/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [select, setSelect] = useState('all');
  const [isTodoSelected, setIsTodoSelected] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const normalizeQuery = query.toLowerCase().trim();

  let filteredTodos = todos.filter((todo) => (
    (todo.title.toLowerCase().includes(normalizeQuery))
  ));

  switch (select) {
    case 'all':
      filteredTodos = filteredTodos.filter(todo => todo);
      break;
    case 'active':
      filteredTodos = filteredTodos.filter(todo => todo.completed === false);
      break;
    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed === true);
      break;
    default:
      return null;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={setQuery}
                query={query}
                select={select}
                onSelectChange={setSelect}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  isTodoSelected={isTodoSelected}
                  onTodoSelect={setIsTodoSelected}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isTodoSelected && (
        <TodoModal
          isTodoSelected={isTodoSelected}
          onTodoSelect={setIsTodoSelected}
        />
      )}
    </>
  );
};
