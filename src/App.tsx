/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

type CurrentFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<CurrentFilter>('all');
  const [query, setQuery] = useState<string>('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const preperedTodos = (
    currentTodos: Todo[],
    currentFilter: CurrentFilter,
    currentQuery?: string,
  ) => {
    let result = currentTodos.map(todo => ({ ...todo })).sort((a, b) => a.id - b.id);

    if (currentQuery) {
      result = result.filter(item =>
        item.title.includes(currentQuery.toLocaleLowerCase().trim()),
      );
    }

    if (currentFilter === 'completed') {
      return result.filter(item => item.completed);
    }

    if (currentFilter === 'active') {
      return result.filter(item => !item.completed);
    }

    return result;
  };

  useEffect(() => {
    if (!query) {
      setLoader(true);
    }

    getTodos()
      .then(responses => setTodos(responses))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterValue={newValue => setFilter(newValue)}
                query={query}
                changeQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}

              {!loader && (
                <TodoList
                  todos={preperedTodos(todos, filter, query)}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={modal => setSelectedTodo(modal)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={modal => setSelectedTodo(modal)}
        />
      )}
    </>
  );
};
