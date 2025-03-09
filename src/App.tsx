/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectOption, setSelectOption] = useState<string>('all');
  const [selectSearch, setSelectSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesOption =
      selectOption === 'all' ||
      (selectOption === 'active' && !todo.completed) ||
      (selectOption === 'completed' && todo.completed);

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(selectSearch.toLowerCase());

    return matchesOption && matchesSearch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectOption={selectOption}
                selectSearch={selectSearch}
                onFilterChange={setSelectOption}
                onSearchChange={setSelectSearch}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={setSelectTodo}
                  selectedTodoId={selectTodo?.id ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal todo={selectTodo} onClose={() => setSelectTodo(null)} />
      )}
    </>
  );
};
