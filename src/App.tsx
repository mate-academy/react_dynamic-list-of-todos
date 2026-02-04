/* eslint-disable prettier/prettier */
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

export enum FilterStatusTypes {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(tds => {
        setTodos(tds);
        setLoading(false);
      });
  }, []);

  const [query, setQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatusTypes>(FilterStatusTypes.All);

  const getVisibleTodos = () => {
    let preparedTodos = [...todos];

    switch (filterStatus) {
      case FilterStatusTypes.Active:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
      case FilterStatusTypes.Completed:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
      case FilterStatusTypes.All:
      default:
        break;
    }

    if (query) {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    return preparedTodos;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={filterStatus}
                onStatusChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={getVisibleTodos()}
                onSelect={setSelectedTodo}
                isSelected={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
