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
import { FilterType } from './types/FilteredType';

const getFilteredTodos = (todos: Todo[], sorted: FilterType, query: string) => {
  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }

  switch (sorted) {
    case FilterType.active:
      return filteredTodos.filter(todo => !todo.completed);

    case FilterType.completed:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [sorted, setSorted] = useState(FilterType.all);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const preparedTodos = getFilteredTodos(todos, sorted, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                query={query}
                setSorted={setSorted}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && !!todos.length && (
                <TodoList
                  todos={preparedTodos}
                  selectedTodo={selectedTodo}
                  setselectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
