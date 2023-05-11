/* eslint-disable no-console */
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
import { Filter } from './types/enums';

const prepareTodos = (todos: Todo[], query: string, filter: Filter) => {
  let preparedTodos = [...todos];

  if (query) {
    const searchQuery = query.trim().toLowerCase();

    preparedTodos = preparedTodos.filter(todo => todo.title.toLowerCase().includes(searchQuery));
  }

  switch (filter) {
    case Filter.active:
      preparedTodos = preparedTodos.filter((todo) => !todo.completed);
      break;

    case Filter.completed:
      preparedTodos = preparedTodos.filter((todo) => todo.completed);
      break;

    case Filter.all:
    default:
      break;
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const visibleTodos = prepareTodos(todos, query, filter);

  const handleSelect = (item: Filter) => {
    setFilter(item);
  };

  useEffect(() => {
    getTodos().then((data) => setTodos(data));
  }, []);

  console.log(selectedTodo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onSelect={handleSelect}
                onChangeQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    onSelectTodo={setSelectedTodo}
                  />
                )
                : (<Loader />)}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
