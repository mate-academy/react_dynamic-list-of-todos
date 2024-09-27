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
import { Filter } from './types/Filter';

type Props = {
  filterBy: string;
  query: string;
};

function getFilteredTodos(todos: Todo[], { filterBy, query }: Props) {
  let filteredTodos = [...todos];
  const lowerQuery = query.trim().toLowerCase();

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

  if (lowerQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(lowerQuery),
    );
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState(Filter.All);

  const filteredTodos = getFilteredTodos(todos, { filterBy, query });

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleQueryChange = (newQuery: string) => {
    if (newQuery.trim() !== '' || newQuery === '') {
      setQuery(newQuery);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setFilterBy={setFilterBy}
                setQuery={handleQueryChange}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todos.length > 0 && (
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
