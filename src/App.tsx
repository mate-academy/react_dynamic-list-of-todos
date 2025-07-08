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
import { FilterField } from './types/FilterField';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterField, setFilterField] = useState<FilterField>(FilterField.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => {
        let filteredTodos = todos;

        switch (filterField) {
          case FilterField.Active:
            filteredTodos = todos.filter(todo => !todo.completed);
            break;
          case FilterField.Completed:
            filteredTodos = todos.filter(todo => todo.completed);
            break;
          default:
            break;
        }

        if (query.trim()) {
          filteredTodos = filteredTodos.filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
        }

        setVisibleTodos(filteredTodos);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filterField, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFieldChange={setFilterField}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onClick={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClick={setSelectedTodo} />
      )}
    </>
  );
};
