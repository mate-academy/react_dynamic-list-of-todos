/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { FilterBy, Todo } from './types/Todo';
import { getTodos } from './api';
import { filterTodos } from './service/todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todoData: Todo[]) => {
        setTodos(todoData);
      })
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodoId) {
      setSelectedTodo(null);

      return;
    }

    const openedTodo = todos.find(todo => todo.id === selectedTodoId);

    if (openedTodo?.userId) {
      setSelectedTodo({
        ...openedTodo,
      });
    }
  }, [selectedTodoId]);

  const preparedTodos = filterTodos(todos, filterBy, query);
  const isShowTodoList = (!isLoading || (isLoading && selectedTodoId))
    && (!errorMessage && todos.length > 0);

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
                filterBy={filterBy}
                onFilterChange={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading && !selectedTodoId && <Loader />}

              {isShowTodoList && (
                <TodoList
                  todos={preparedTodos}
                  onTodoClick={(todoId) => setSelectedTodoId(todoId)}
                  selectedTodoId={selectedTodoId}
                />
              )}

              {errorMessage && (
                <p className="has-text-danger">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodoId={(todoId) => setSelectedTodoId(todoId)}
        />
      )}
    </>
  );
};
