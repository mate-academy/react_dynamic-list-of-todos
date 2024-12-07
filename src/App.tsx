/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash.debounce';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loaded, setLoaded] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      const loadedTodos = getTodos();

      setTodos(await loadedTodos);
      setLoaded(false);
    };

    loadTodos();
  }, []);

  const applyQuery = debounce((string: string) => {
    setAppliedQuery(string);
  }, 300);

  const handleInput = (value: string) => {
    applyQuery(value);
    setQuery(value);
  };

  const visibleTodos = useMemo(() => {
    let filteredTodos;

    switch (filterStatus) {
      case 'all':
        filteredTodos = todos;
        break;
      case 'active':
        filteredTodos = todos.filter(todo => todo.completed === false);
        break;
      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed === true);
        break;
      default:
        return todos;
    }

    if (appliedQuery.trim()) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title
          .toLocaleLowerCase()
          .includes(appliedQuery.trim().toLowerCase()),
      );
    }

    return filteredTodos;
  }, [appliedQuery, filterStatus, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                onStatusChanged={setFilterStatus}
                onQueryChanged={handleInput}
                status={filterStatus}
                query={query}
              />
            </div>

            <div className="block">
              {loaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelected={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onCloseModal={setSelectedTodo} />
      )}
    </>
  );
};
