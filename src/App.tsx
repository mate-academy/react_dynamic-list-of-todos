/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { StatusFilter } from './helpers/StatusFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [todoFilter, setTodoFilter] = useState<StatusFilter>(StatusFilter.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const visibleTodos = todos.filter(todo => {
    const formattedTitle = todo.title.toLowerCase().trim();
    const formattedInputValue = inputValue.toLowerCase().trim();

    const matchesQuery = formattedTitle.includes(formattedInputValue);

    switch (todoFilter) {
      case StatusFilter.All:
        return todo && matchesQuery;

      case StatusFilter.COMPLETED:
        return todo.completed && matchesQuery;

      case StatusFilter.ACTIVE:
        return !todo.completed && matchesQuery;

      default:
        throw new Error(`Wrong filter, ${todoFilter} is not defined`);
    }
  });

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then(todo => {
        setTodos(todo);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={inputValue}
                setInputValue={setInputValue}
                setTodoFilter={setTodoFilter}
              />
            </div>

            <div className="block">
              {loader
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    selectTodo={selectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
      />
    </>
  );
};
