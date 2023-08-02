/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { Loader } from './components/Loader';
import { useDataAfterDelay } from './utils/loading';

const { All, Active, Completed } = FilterType;

const filterTodos = (
  todos: Todo[],
  filter: FilterType,
  searchQuery: string,
) => {
  const query = searchQuery.trim().toLowerCase();

  const filterByQuery = (todo: Todo) => todo.title.toLowerCase().includes(query);

  switch (filter) {
    case Active:
      return todos.filter((todo: Todo) => !todo.completed && filterByQuery(todo));

    case Completed:
      return todos.filter((todo: Todo) => todo.completed && filterByQuery(todo));

    case All:
    default:
      return todos.filter(filterByQuery);
  }
};

export const App: React.FC = () => {
  const [pickedTodo, setPickedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterType>(All);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: todosFromAPI,
    loading: todosLoading,
    error,
  } = useDataAfterDelay(getTodos);

  useEffect(() => {
    if (todosFromAPI) {
      setFilteredTodos(filterTodos(todosFromAPI, filter, searchQuery));
    }
  }, [filter, searchQuery, todosFromAPI]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            {!error ? (
              <div className="block">
                {todosLoading && <Loader />}
                {!todosLoading && (
                  <TodoList
                    todos={filteredTodos}
                    pickTodo={setPickedTodo}
                    pickedTodo={pickedTodo}
                  />
                )}
              </div>
            ) : (
              <p>{error}</p>
            )}
          </div>
        </div>
      </div>

      {pickedTodo && <TodoModal todo={pickedTodo} pickTodo={setPickedTodo} />}
    </>
  );
};
