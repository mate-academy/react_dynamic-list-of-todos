import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(Status.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        throw new Error('Please try again later');
      })
      .finally(() => setLoading(false));
  }, []);

  function filterTodos(
    items: Todo[],
    status: Status,
    queryValue: string,
  ) {
    let filtered = [...items];

    if (queryValue) {
      filtered = filtered.filter(item => {
        return item.title.toLowerCase().includes(queryValue?.toLowerCase());
      });
    }

    switch (status) {
      case Status.Active:
        return filtered.filter(item => !item.completed);

      case Status.Completed:
        return filtered.filter(item => item.completed);

      case Status.All:
      default:
        return filtered;
    }
  }

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, selectedStatus, query);
  }, [todos, selectedStatus, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedStatus={setSelectedStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (<Loader />)}

              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
