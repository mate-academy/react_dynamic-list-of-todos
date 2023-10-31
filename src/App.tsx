import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filters } from './types/Filters';

const getPreparedTodos = ({ todos, filterBy, query }: {
  todos: Todo[],
  filterBy: keyof typeof Filters,
  query: string,
}): Todo[] => {
  const helpers = {
    [Filters.all]: todos,
    [Filters.active]: todos.filter(todo => !todo.completed),
    [Filters.completed]: todos.filter(todo => todo.completed),
  };

  let filteredTodos = helpers[filterBy];

  if (query) {
    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<keyof typeof Filters>(Filters.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = getPreparedTodos({ todos, filterBy, query });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                onChangeFilter={setFilterBy}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    onSelectTodo={setSelectedTodo}
                    selected={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onModalClose={setSelectedTodo}
        />
      )}
    </>
  );
};
