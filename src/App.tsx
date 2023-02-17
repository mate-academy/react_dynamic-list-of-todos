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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');

  let visibleTodos = [...todos];

  if (query) {
    const preparedQuery = query.trim().toLowerCase();

    visibleTodos = visibleTodos.filter(todo => todo
      .title
      .toLowerCase()
      .includes(preparedQuery));
  }

  switch (filterBy) {
    case 'active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;
    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
    case 'all':
    default:
      visibleTodos = [...visibleTodos];
      break;
  }

  const fetchData = async () => {
    const data = await getTodos();

    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                  showTodo={showTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          closeTodo={closeTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
