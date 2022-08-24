/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Maybe } from './types/Maybe';
import { FilterTypes } from './types/FilterTypes';
import { getTodos } from './api';
import './app.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState<Maybe<number>>(null);
  const selectedTodo = useMemo(() => todos.find(todo => todo.id === selectedTodoId), [selectedTodoId]);

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(FilterTypes.All);
  const filteredTodos = useMemo(() => {
    return todos.filter(({ title, completed }) => {
      const filteringByTitle = title.toLowerCase().includes(query.toLowerCase());

      switch (filterType) {
        case FilterTypes.All:
          return filteringByTitle;

        case FilterTypes.Active:
          return filteringByTitle && !completed;

        case FilterTypes.Completed:
          return filteringByTitle && completed;

        default:
          return filteringByTitle;
      }
    });
  }, [query, todos, filterType]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

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
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoadingTodos
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    setSelectedTodoId={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== undefined && (
        <TodoModal
          setSelectedTodoId={setSelectedTodoId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
