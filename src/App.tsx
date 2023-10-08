/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

function checkQuery(string: string, query: string): boolean {
  const preparedString = string.toLowerCase().trim();
  const preparedQuery = query.toLowerCase().trim();

  return preparedString.includes(preparedQuery);
}

function filterTodos(todos: Todo[], query: string, filterField: FilterType) {
  let filteredTodos = todos;

  if (filterField !== FilterType.All) {
    switch (filterField) {
      case FilterType.Completed: {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      }

      case FilterType.Active: {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      }

      default:
        throw new Error('Error');
    }
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => checkQuery(todo.title, query));
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [filterField, setFilterField] = useState(FilterType.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setTodosLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setTodosLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, query, filterField);
  }, [todos, query, filterField]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeFilterField={setFilterField}
                filterField={filterField}
                onChangeQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">

              {filteredTodos.length ? (
                <TodoList
                  todos={filteredTodos}
                  onChangeSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                todosLoading && <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            onChangeSelectedTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
