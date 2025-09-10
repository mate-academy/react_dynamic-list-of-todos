/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodosList } from './components/TodosList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const [value, setValue] = useState('');
  const [valueSelect, setValueSelect] = useState('');
  const handleQueryChange = (q: string) => setValue(q);
  const handleFilterChange = (f: string) => setValueSelect(f);
  const handleSelectTodo = (t: Todo | null) => setActiveTodo(t);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (valueSelect === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (valueSelect === 'completed') {
      result = result.filter(todo => todo.completed);
    } else if (valueSelect === 'all') {
      result = result;
    }

    return result.filter(todo =>
      todo.title.toLowerCase().includes(value.toLowerCase()),
    );
  }, [todos, value, valueSelect]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={handleQueryChange}
                onFilterChange={handleFilterChange}
                valueSelect={valueSelect}
                value={value}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodosList
                  todos={filteredTodos}
                  activeTodo={activeTodo}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          onClose={() => setActiveTodo(null)}
        />
      )}
    </>
  );
};
