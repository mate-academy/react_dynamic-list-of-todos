/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { SortType } from './types/SortType';

function normalizeQuery(query: string) {
  return query.toLowerCase().trim();
}

function filterTodos(todos: Todo[], sortType: string, query: string): Todo[] {
  let copyTodos = [...todos];

  switch (sortType) {
    case SortType.Active:
      copyTodos = copyTodos.filter(todo => !todo.completed);
      break;
    case SortType.Completed:
      copyTodos = copyTodos.filter(todo => todo.completed);
      break;
    case SortType.All:
    default: break;
  }

  return copyTodos.filter(todo => normalizeQuery(todo.title)
    .includes(normalizeQuery(query)));
}

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos().then((data) => setTodos(filterTodos(data, sortType, query)))
      .then(() => setLoading(false));
  }, [sortType, query]);

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
                sortType={sortType}
                setSortType={(type: SortType) => setSortType(type)}

              />
            </div>

            <div className="block">
              {loading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={todos}
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
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
