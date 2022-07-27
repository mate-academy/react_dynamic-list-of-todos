/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<Todo[]>(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState('all');

  useEffect(() => {
    getTodos()
      .then(todo => {
        setFilterTodos(todo);
        setTodos(todo);
      });
  }, []);

  const getFilteredTodos = () => {
    const lowerQuery = query.toLowerCase();
    const completed = todos
      .filter(todo => todo.completed === true && todo.title.includes(lowerQuery));
    const active = todos
      .filter(todo => todo.completed === false && todo.title.includes(lowerQuery));
    const all = todos
      .filter(todo => todo.title.includes(lowerQuery));

    switch (selectedValue) {
      case 'active':
        return setFilterTodos(active);

      case 'completed':
        return setFilterTodos(completed);

      default:
        return setFilterTodos(all);
    }
  };

  useEffect(() => {
    getFilteredTodos();
  }, [query, selectedValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedValue={setSelectedValue}
                setQuery={setQuery}
                query={query}
                selectedValue={selectedValue}
              />
            </div>

            <div className="block">
              { !todos.length ? (
                <Loader />
              )
                : (
                  <TodoList
                    filterTodos={filterTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onClose={() => setSelectedTodo(null)}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
