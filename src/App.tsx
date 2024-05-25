/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { getTodos } from './api';

interface FilterParams {
  filterBy: string;
  query: string;
}

function getFilteredTodos(todos: Todo[], { filterBy, query }: FilterParams) {
  let filteredTodos = [...todos];
  const niceQuery = query.trim().toLowerCase();

  switch (filterBy) {
    case Filter.ACTIVE:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Filter.COMPLETED:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (niceQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(niceQuery),
    );
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(Filter.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = getFilteredTodos(todos, { filterBy, query });
  const handleQueryChange = (qy: string) => {
    if (qy.trim() !== '' || qy === '') {
      setQuery(qy);
    }
  };

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
                filtration={setFilterBy}
                setQuery={handleQueryChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && !!todos.length && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
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
