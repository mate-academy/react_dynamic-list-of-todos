/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { OptionType } from './types/OptionType';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterField, setFilterField] = useState<OptionType>(OptionType.All);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleCloseTodo = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    const newFilteredTodos = todos.filter(todo => {
      const matchesField =
        filterField === OptionType.All ||
        (filterField === OptionType.Completed && todo.completed) ||
        (filterField === OptionType.Active && !todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      return matchesField && matchesQuery;
    });

    setFilteredTodos(newFilteredTodos);
  }, [todos, filterField, query]);

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
                setFilterField={setFilterField}
              />
            </div>

            <div className="block">
              {loading && todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseTodo} />
      )}
    </>
  );
};
