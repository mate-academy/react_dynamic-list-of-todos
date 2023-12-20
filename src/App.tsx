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
import { SortBy } from './types/SortBy';

const sortTodosBy = (
  todos: Todo[],
  query: string,
  sortType: SortBy,
) => {
  let sortedTodos = [...todos];

  if (query.trim()) {
    sortedTodos = (todos.filter(
      todo => todo.title.toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
    ));
  }

  switch (sortType) {
    case SortBy.Active:
      sortedTodos = sortedTodos.filter(todo => !todo.completed);
      break;
    case SortBy.Completed:
      sortedTodos = sortedTodos.filter(todo => todo.completed);
      break;
    case SortBy.All:
    default:
      break;
  }

  return sortedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState(SortBy.All);

  const selectedTodos = sortTodosBy(todos, query, sortBy);

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then((currentTodos) => setTodos(currentTodos))
      .finally(() => setLoader(false));
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
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            <div className="block">
              {loader
                ? <Loader />
                : (
                  <TodoList
                    todos={selectedTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                    setVisibleModal={setVisibleModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {visibleModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          setVisibleModal={setVisibleModal}
        />
      )}
    </>
  );
};
