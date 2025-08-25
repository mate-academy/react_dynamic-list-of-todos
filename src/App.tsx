/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';

import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function filterTodo(selectedFilter: Filter, todo: Todo) {
  switch (selectedFilter) {
    case Filter.All:
      return todo;
    case Filter.Active:
      return todo && !todo.completed;
    case Filter.Completed:
      return todo && todo.completed;
    default:
      return 0;
  }
}

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.All);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setAllTodos([]);
    setLoader(true);
    getTodos().then(todosFromServer => {
      setAllTodos(todosFromServer);
      setLoader(false);
    });
  }, []);

  const todos = allTodos.filter(
    todo =>
      filterTodo(selectedFilter, todo) &&
      todo.title.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectFilter={setSelectedFilter}
                input={inputValue}
                setInputValue={setInputValue}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal todo={selectedTodo} deleteTodo={setSelectedTodo} />
      )}
    </>
  );
};
