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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(result => {
        setTodos(result);
        setLoading(false);
      })
      .catch(() => {
        throw new Error('Uploading error');
      });
  }, []);

  const filterHandler = (
    filterType: string,
    queryValue: string,
    allTodos: Todo[],
  ) => {
    const filteredQuery = allTodos.filter(todo => todo.title.toLocaleLowerCase().includes(queryValue.toLocaleLowerCase().trim()));
    const active = filteredQuery.filter(todo => !todo.completed);
    const completed = filteredQuery.filter(todo => todo.completed);

    switch (filterType) {
      case 'all':
        return !queryValue ? allTodos : filteredQuery;
      case 'active':
        return active;
      case 'completed':
        return completed;
      default:
        throw new Error('No filter type');
    }
  };

  const visibleTodos = filterHandler(filter, query, todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                setQuery={setQuery}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedItem && (
        <TodoModal
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
};
