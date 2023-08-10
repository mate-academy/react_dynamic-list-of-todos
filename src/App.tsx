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
import { FilterType } from './components/FilterList/FilterList';

function getFilteredTodos(
  todos: Todo[],
  query: string,
  filter: FilterType,
) {
  let filteredList = todos.slice();
  const normaliseQuery = query.trim().toLocaleLowerCase();

  if (query) {
    filteredList = todos.filter((todo: Todo) => todo.title.toLocaleLowerCase().includes(normaliseQuery));
  }

  if (filter) {
    switch (filter) {
      case FilterType.COMPLITED:
        filteredList = filteredList.filter(todo => todo.completed);
        break;

      case FilterType.ACTIVE:
        filteredList = filteredList.filter(todo => !todo.completed);
        break;

      default:
        break;
    }
  }

  return filteredList;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [selectTodoId, setSelectTodoId] = useState<number | null>(null);

  const selectTodos = getFilteredTodos(todos, query, filter);
  const selectTodo = selectTodos.find(todo => todo.id === selectTodoId);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch((error) => {
        throw new Error(error.message);
      })
      .finally(() => setIsLoading(false));
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
                onSelectQuery={setQuery}
                filter={filter}
                onSelectFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={selectTodos}
                  onSelectTodoId={setSelectTodoId}
                  selectTodoId={selectTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal
          todo={selectTodo}
          reset={(todoId: null) => setSelectTodoId(todoId)}
        />
      )}
    </>
  );
};
