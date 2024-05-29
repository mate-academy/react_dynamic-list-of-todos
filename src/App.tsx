/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

type FilterParams = {
  filterBy: string;
  query: string;
};

function getFilteredTodos(todos: Todo[], { filterBy, query }: FilterParams) {
  let filteredTodos = [...todos];
  const preparedQuery = query.trim().toLocaleLowerCase();

  switch (filterBy) {
    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;
  }

  if (preparedQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(preparedQuery),
    );
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = getFilteredTodos(todos, { filterBy, query });

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
                filtration={setFilterBy}
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
