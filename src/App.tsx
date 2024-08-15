import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { debounce } from './utils/debounce';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterName, setFilterName] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(todosFromServer => {
      setIsLoading(false);
      setTodos(todosFromServer);
    });
  }, []);

  const applyQuery = useCallback(debounce(setAppliedQuery, 300), []);

  function handleToggleEye(todoId: number | null) {
    if (todoId) {
      setSelectedTodo(todos.find(({ id }) => id === todoId) || null);
    } else {
      setSelectedTodo(null);
    }
  }

  function handleSetFilterName(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilterName(event.target.value);
  }

  function handleSetSearchQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    applyQuery(event.target.value);
  }

  function handleClearSearchQuery() {
    setSearchQuery('');
    applyQuery('');
  }

  const getVisibleTodos = useCallback(() => {
    let filteredTodos = [...todos];

    if (filterName === 'active' || filterName === 'completed') {
      filteredTodos = todos.filter(({ completed }) => {
        if (filterName === 'active') {
          return !completed;
        } else {
          return completed;
        }
      });
    }

    if (appliedQuery) {
      filteredTodos = filteredTodos.filter(({ title }) =>
        title.toLowerCase().includes(appliedQuery.toLowerCase()),
      );
    }

    return filteredTodos;
  }, [todos, filterName, appliedQuery]);

  const visibleTodos = getVisibleTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                onSetFilterName={handleSetFilterName}
                onSetSearchQuery={handleSetSearchQuery}
                clearQuery={handleClearSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={visibleTodos}
                  onToggleEye={handleToggleEye}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
