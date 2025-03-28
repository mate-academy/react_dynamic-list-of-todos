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
import { FilterParams } from './types/FilterParams';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();

  const [inputQuery, setInputQuery] = useState('');
  const [filter, setFilter] = useState(FilterParams.ALL);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todoList => {
        if (filter === FilterParams.ALL) {
          return todoList;
        }

        return todoList.filter(todo =>
          filter === FilterParams.ACTIVE
            ? todo.completed === false
            : todo.completed === true,
        );
      })
      .then(todoList => {
        if (!inputQuery) {
          return todoList;
        }

        return todoList.filter(todo =>
          todo.title.toLowerCase().includes(inputQuery.toLowerCase()),
        );
      })
      .then(todoList => setTodos(todoList))
      .finally(() => setIsLoading(false));
  }, [inputQuery, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputQuery={inputQuery}
                onChangeFilter={newFilter => setFilter(newFilter)}
                onChangeInputQuery={newInput => setInputQuery(newInput)}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  onSelectedTodos={selected => setSelectedTodo(selected)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(undefined)}
        />
      )}
    </>
  );
};
