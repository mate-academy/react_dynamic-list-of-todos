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

enum Options {
  active = 'active',
  completed = 'completed',
  all = 'all',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const visibleTodos = () => (
    todos.filter(todo => {
      const filteredByQuery = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (option) {
        case Options.active:
          return !todo.completed && filteredByQuery;

        case Options.completed:
          return todo.completed && filteredByQuery;

        default:
          return filteredByQuery;
      }
    }));

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
                option={option}
                setOption={setOption}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos()}
                    onSelectTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && (
        <TodoModal
          todo={selectedTodo}
          onTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
