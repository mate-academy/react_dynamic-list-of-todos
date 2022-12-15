/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoOption } from './types/TodoOption';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [todoOption, setTodoOption] = useState<string>(TodoOption.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  getTodos()
    .then(result => setAllTodos(result));

  const visibleTodos = () => {
    return allTodos.filter(todo => {
      const normQuery = query.toLocaleLowerCase();

      switch (todoOption) {
        case TodoOption.All:
          return todo.title.toLocaleLowerCase().includes(normQuery);

        case TodoOption.ACTIVE:
          return todo.title.toLocaleLowerCase().includes(normQuery) && !todo.completed;

        case TodoOption.COMPLETED:
          return todo.title.toLocaleLowerCase().includes(normQuery) && todo.completed;

        default:
          return todo;
      }
    });
  };

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
                todoOption={todoOption}
                setTodoOption={setTodoOption}
              />
            </div>

            <div className="block">
              {allTodos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    allTodos={visibleTodos()}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
