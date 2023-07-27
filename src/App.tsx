/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './utilites/todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Todo[]>(todos);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState<Todo | null>(null);
  const [state, setState] = useState('All');

  useEffect(() => {
    setLoaded(true);

    setTimeout(() => {
      getTodos().then(todosFromServer => {
        setTodos(todosFromServer);
      }).finally(() => setLoaded(false));
    }, 1000);
  }, []);

  useEffect(() => {
    let filteredQuery = [...todos];
    const normalizedQuery = query.trim().toLowerCase();

    if (query) {
      filteredQuery = filteredQuery.filter(
        todo => todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    switch (state) {
      case 'active':
        filteredQuery = filteredQuery.filter(item => !item.completed);
        break;

      case 'completed':
        filteredQuery = filteredQuery.filter(item => item.completed);
        break;

      default:
        break;
    }

    setFiltered(filteredQuery);
  }, [todos, query, state]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={setQuery}
                state={state}
                onChangeState={setState}
              />
            </div>

            <div className="block">
              {loaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filtered}
                  selectedTodo={selected}
                  onSelectedTodo={setSelected}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <TodoModal
          todoModal={selected}
          onDeleteSelected={setSelected}
        />
      )}
    </>
  );
};
