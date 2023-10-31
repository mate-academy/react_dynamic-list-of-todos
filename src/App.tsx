import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todos } from './types/Todos';
import { Todo } from './types/Todo';
import { prepareTodos } from './utils/prepareTodos';
import { FilterType } from './types/FilterType';

// comment just to reset test on GitHub

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos>({
    todos: [],
    loading: false,
  });
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [filter, setFilter] = useState({
    type: FilterType.All,
    query: '',
  });

  const preparedTodos = prepareTodos(filter, todos);

  useEffect(() => {
    setTodos((prevTodos) => ({
      ...prevTodos,
      loading: true,
    }));

    getTodos()
      .then((data) => setTodos((prevTodos) => ({
        ...prevTodos,
        todos: data,
      })))
      .finally(() => setTodos((prevTodos) => ({
        ...prevTodos,
        loading: false,
      })));
  }, []);

  const handleFilterTypeChange = (newType: FilterType) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      type: newType,
    }));
  };

  const handleFilterQueryChange = (newQuery: string) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      query: newQuery,
    }));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={filter.query}
                type={filter.type}
                onTypeChange={handleFilterTypeChange}
                onQueryChange={handleFilterQueryChange}
              />
            </div>

            <div className="block">
              {todos.loading && <Loader />}
              {!todos.loading && (
                <TodoList
                  todos={preparedTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  setSelectedUserId={setSelectedUserId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUserId={selectedUserId}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
