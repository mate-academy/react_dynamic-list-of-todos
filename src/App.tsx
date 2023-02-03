/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [value, setSelectValue] = useState<string>(Filters.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (value) {
      case Filters.All:
        return todo;
      case Filters.Completed:
        return todo.completed;
      case Filters.Active:
        return !todo.completed;
      default:
        return todo;
    }
  });

  const searchedTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));

  const handleClick = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleFilter = (filter: string) => {
    setSelectValue(filter);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChange={handleFilter}
                onSearch={setQuery}
                selectValue={value}
                query={query}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={searchedTodos}
                    onClick={handleClick}
                    selectedTodo={selectedTodo}
                  />
                )}
              {!searchedTodos.length && todos.length > 0 && (
                <h1 style={{ color: 'red' }}>
                  Unable to find any todos match your request
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClick={handleClick}
        />
      )}
    </>
  );
};
