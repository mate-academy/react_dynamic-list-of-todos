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

interface FilterProps {
  query: string;
  filterBy: Filter;
}

function getFilteredTodos(
  todos: Todo[],
  { filterBy, query }: FilterProps,
) {
  let filteredTodos = [...todos];
  const readyQuery = query.trim().toLowerCase();

  switch (filterBy) {
    case Filter.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Filter.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (readyQuery) {
    return filteredTodos.filter(todo => todo.title.toLowerCase().includes(readyQuery));
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(Filter.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = getFilteredTodos(todos, { query, filterBy });

  const handleQueryChange = (q: string) => {
    if (q.trim() !== '' || q === '') {
      setQuery(q);
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
                filterOption={setFilterBy}
                setQuery={handleQueryChange}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
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
