/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoFilter, getFilteredTodos } from './utils/TodoFilter';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    return getFilteredTodos(todos, filter, query);
  }, [todos, filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    modalView={selectedTodo}
                    setModalView={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        ? (
          <TodoModal
            filteredTodos={filteredTodos}
            modalView={selectedTodo}
            setModalView={setSelectedTodo}
          />
        )
        : null}
    </>
  );
};
