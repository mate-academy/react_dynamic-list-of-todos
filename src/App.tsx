/* eslint-disable no-alert */
/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { SelectFilter } from './types/SelectFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState<SelectFilter>(SelectFilter.ALL);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const responseTodos = await getTodos();

      setTodos(responseTodos);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert('Unexpected error');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const resetQuery = useCallback(() => {
    setQuery('');
  }, []);

  const showModal = useCallback(
    (todo: Todo) => {
      setSelectedTodoId(todo.id);
    },
    [],
  );

  const hideModal = () => {
    setSelectedTodoId(0);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  const transform = (title: string) => title.toLowerCase();
  const parsedQuery = transform(query);

  const visibleTodos = todos.filter(todo => {
    const { title } = todo;
    const isInclude = transform(title).includes(parsedQuery);

    switch (selectFilter) {
      case SelectFilter.ALL:
        return isInclude;

      case SelectFilter.ACTIVE:
        return !todo.completed && isInclude;

      case SelectFilter.COMPLETED:
        return todo.completed && isInclude;

      default:
        throw new Error('Invalid Filter Type!');
    }
  });

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
                reset={resetQuery}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
            </div>

            <div className="block">
              { isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onShow={showModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      { selectedTodoId && (
        <TodoModal todo={selectedTodo} onClose={hideModal} />
      )}
    </>
  );
};
