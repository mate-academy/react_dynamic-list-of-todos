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
import { Filter } from './types/Filter';

const getVisibleTodos = (filter: Filter, todos: Todo[], query: string) => {
  let filteredTodos = [...todos];

  switch (filter) {
    case (Filter.Active):
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    case (Filter.Completed):
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (query) {
    const formattedQuery = query.trim().toLowerCase();

    filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(formattedQuery));
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(Filter.All);

  const visibleTodos = getVisibleTodos(filterBy, todos, query);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
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
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0
              && (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={setSelectedTodo}
        />
      )}
    </>
  );
};
