/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function getPreparedTodos(todos: Todo[], query: string, filter: FilterType) {
  let preparedTodos = [...todos];
  const normalizedQuery = query.trim().toLowerCase();

  if (filter) {
    switch (filter) {
      case FilterType.Active:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
      case FilterType.Completed:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
      case FilterType.All:
      default:
        break;
    }
  }

  if (query) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const visibleTodos = getPreparedTodos(todos, query, filter);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => setLoading(false));
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
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  selectedTodo={selectedTodo}
                  setIsShowModal={setIsShowModal}
                  todos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isShowModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          setIsShowModal={setIsShowModal}
        />
      )}
    </>
  );
};
