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
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const selectFilter = (value: string) => {
    setFilter(value);
  };

  const setFilterQuery = (value: string) => {
    setQuery(value);
  };

  const selectTodoId = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const closeTodoModal = () => {
    setSelectedTodoId(0);
  };

  const normalizedQuery = query
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .join(' ');

  const visibleTodos = todos.filter(todo => {
    const normalizedTodoTitle = todo.title.toLowerCase();
    const isSearchQueryMatch = normalizedTodoTitle.includes(normalizedQuery);

    let isStatusMatch = true;

    switch (filter) {
      case 'active':
        isStatusMatch = !todo.completed;
        break;

      case 'completed':
        isStatusMatch = todo.completed;
        break;

      default:
        isStatusMatch = true;
    }

    return isSearchQueryMatch && isStatusMatch;
  });

  const selectedTodo = visibleTodos.find(
    todo => todo.id === selectedTodoId,
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectFilter={selectFilter}
                filter={filter}
                onFilter={setFilterQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    onSelectTodoId={selectTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={closeTodoModal} />
      )}
    </>
  );
};
