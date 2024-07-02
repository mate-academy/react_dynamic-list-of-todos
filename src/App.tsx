/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { SelectField } from './types/SelectField';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectValue, setSelectValue] = useState<SelectField>(SelectField.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    if (selectValue !== SelectField.All) {
      filteredTodos = filteredTodos.filter(todo => {
        switch (selectValue) {
          case SelectField.Active:
            return !todo.completed;

          case SelectField.Completed:
            return todo.completed;
        }
      });
    }

    if (query) {
      const filterQuery = query.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        const title = todo.title.toLowerCase();

        return title.includes(filterQuery);
      });
    }

    return filteredTodos;
  }, [selectValue, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={visibleTodos}
                  todoId={selectedTodo?.id || 0}
                  setTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setTodo={setSelectedTodo} />
      )}
    </>
  );
};
