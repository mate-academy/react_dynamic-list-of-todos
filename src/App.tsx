/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum SelectOption {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .then(() => setIsLoading(false));
  }, []);

  const getTodoList = (primaryTodos: Todo[], newQuery: string) => {
    let todosCopy = [...primaryTodos];

    if (newQuery) {
      todosCopy = todosCopy.filter(todo =>
        todo.title.toLowerCase().includes(newQuery.toLowerCase()),
      );
    }

    return todosCopy;
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const hadleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  let visibleTodos = getTodoList(todos, query);

  if (filter === SelectOption.Active) {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (filter === SelectOption.Completed) {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChange={handleQueryChange}
                query={query}
                onClear={clearQuery}
                onFilter={handleFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} onSelectTodo={hadleSelectTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onCloseModal={closeModal} />
      )}
    </>
  );
};
