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

const FILTER_ACTIVE = 'active';
const FILTER_COMPLETED = 'completed';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const visibleTodos = useMemo(() => {
    let result = [...todos];

    switch (filterStatus) {
      case FILTER_ACTIVE:
        result = [...result].filter(todo => todo.completed === false);
        break;
      case FILTER_COMPLETED:
        result = [...result].filter(todo => todo.completed === true);
        break;
    }

    if (query) {
      result = result.filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return result;
  }, [todos, query, filterStatus]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (e) {
        return;
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

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
                filterBy={filterStatus}
                setFilterBy={setFilterStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
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
