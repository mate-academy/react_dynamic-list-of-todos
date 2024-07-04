/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export enum Filters {
  'all',
  'active',
  'completed',
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFilter, setTodosFilter] = useState<Filters>(Filters.all);
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  function getSelectedTodoById() {
    return todos.find(todo => todo.id === selectedTodoId) || todos[0];
  }

  const isFilter = (value: any): value is Filters => {
    return Object.values(Filters).includes(value);
  };

  const handlerFilterTodos = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const selectedValue = event.target.value;

    if (isFilter(selectedValue)) {
      return setTodosFilter(selectedValue);
    } else {
      return;
    }
  };

  const handlerInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    return setQuery(event.target.value);
  };

  const clearQuery = () => setQuery('');

  const handleSelectTodo = (id: number) => setSelectedTodoId(id);

  const filteredTodos = todos
    .filter(todo => {
      if (todosFilter === Filters.active) {
        return !todo.completed;
      }

      if (todosFilter === Filters.completed) {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={handlerInputValue}
                filter={todosFilter}
                setTodosFilter={handlerFilterTodos}
                clearQuery={clearQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodoId}
                  setSelectedTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          selectedTodo={getSelectedTodoById()}
          setSelectedTodo={handleSelectTodo}
        />
      )}
    </>
  );
};
