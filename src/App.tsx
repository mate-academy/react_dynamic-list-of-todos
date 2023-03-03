/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos } from './api';

import { FilterType } from './types/FilterType';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoId, setTodoId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function loadTodosFromServer() {
    const getTodosFromServer = await getTodos();

    setTodos(getTodosFromServer);
    setIsLoading(false);
  }

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const getFilteredTodos = () => {
    const toFilter = todos.filter((item) => {
      const queryToLowerCase = query.toLowerCase();
      const filterInput = item.title.toLowerCase().includes(queryToLowerCase);

      switch (filterType) {
        case FilterType.Active:
          return !item.completed && filterInput;
        case FilterType.Completed:
          return item.completed && filterInput;
        default:
          return filterInput;
      }
    });

    return toFilter;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                query={query}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}
              <TodoList
                todos={getFilteredTodos()}
                setSelectedTodo={setSelectedTodo}
                setSelectedTodoId={setTodoId}
                selectedTodoId={todoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && todoId !== 0 && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setTodoId}
        />
      )}

    </>
  );
};
