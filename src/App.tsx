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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState('all');
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos([...todosFromServer]));
  }, []);

  const lowCaseQuery = query.toLocaleLowerCase();

  const visibleTodos = todos.filter(todo => {
    if ((filterValue === 'active' && todo.completed)
    || (filterValue === 'completed' && !todo.completed)) {
      return false;
    }

    const lowCaseTitle = todo.title.toLocaleLowerCase();

    return lowCaseTitle.includes(lowCaseQuery);
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
                onSetQuery={setQuery}
                onSetFilterValue={setFilterValue}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo?.id && (
        <TodoModal
          selectedTodo={selectedTodo}
          cleanSelectedTodo={setSelectedTodo}
        />
      )}

      {/* --------------------------------------------------------------------- */}
      {/* <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              <Loader />
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal /> */}
    </>
  );
};
