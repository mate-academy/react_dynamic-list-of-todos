/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterOption } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>(FilterOption.All);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(result => setTodos(result));
  }, []);

  const todosFound = useMemo(() => {
    return todos.filter(todo => {
      const filterBy = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (filter) {
        case 'active':
          return !todo.completed && filterBy;
        case 'completed':
          return todo.completed && filterBy;
        default:
          return filterBy;
      }
    });
  }, [todos, query, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={query}
                setValue={setQuery}
                onChangeOption={setFilter}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={todosFound}
                    selectedTodo={currentTodo}
                    setSelectedTodo={setCurrentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          currentTodo={currentTodo}
          setCurrentTodo={setCurrentTodo}
        />
      )}
    </>
  );
};
