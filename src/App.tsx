/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

import { getTodos } from './api';

const preparedTodos = (items: Todo[], filter: Filter, query: string): Todo[] => {
  let copy = [...items];

  copy = copy.filter(item => {
    switch (filter) {
      case Filter.All:
        return true;

      case Filter.Active:
        return !item.completed;

      case Filter.Completed:
        return item.completed;

      default:
        return true;
    }
  });

  if (query) {
    copy = copy.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  }

  return copy;
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

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
              <TodoFilter onFilter={setFilter} onQuery={setQuery} query={query} />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={preparedTodos(todos, filter, query)}
                  onClickModal={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onSelected={setSelectedTodo} />
      )}
    </>
  );
};
