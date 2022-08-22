/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

function shuffleTodos(array: Todo[]) {
  const result = [...array];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [todo, setTodo] = useState<Todo>();
  const [selectedTodo, setSelectedTodo] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(data => {
        setInitialTodos(data);
        setLoaded(true);
      });
  }, []);

  const todos = useMemo(() => initialTodos.filter(currentTodo => (filterType === 'all' || (filterType === 'active') === (!currentTodo.completed))
    && currentTodo.title.match(new RegExp(query, 'i'))), [filterType, query, initialTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                setFilterType={setFilterType}
                appliedQuery={query}
                setAppliedQuery={setQuery}
              />
            </div>

            <button
              className="block button"
              type="button"
              disabled={todos.length <= 1}
              onClick={() => {
                setInitialTodos(shuffleTodos(initialTodos));
              }}
            >
              Randomize
            </button>

            <div className="block">
              {!loaded
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    selectedTodo={selectedTodo ? todo : undefined}
                    setTodo={setTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && todo && <TodoModal todo={todo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
