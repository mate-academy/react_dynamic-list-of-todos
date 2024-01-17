/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<Filter>(Filter.all);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    let copyTodos = [...todos];

    if (query.length) {
      copyTodos = copyTodos
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    switch (filterBy) {
      case Filter.active:
        return copyTodos.filter(item => !item.completed);

      case Filter.completed:
        return copyTodos.filter(item => item.completed);

      default:
        return copyTodos;
    }
  }, [query, filterBy, todos]);

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
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && !!todos.length && (
                <TodoList
                  todos={filteredTodos}
                  selected={selectedTodo}
                  onSelected={setSelectedTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selected={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
