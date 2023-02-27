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

enum SelectOption {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectFilter, setSelectFilter] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter((todo) => todo
      .title.toLowerCase().includes(query.toLowerCase()));
  }

  switch (selectFilter) {
    case SelectOption.All:
      break;

    case SelectOption.Active:
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
      break;

    case SelectOption.Completed:
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
      break;

    default:
      break;
  }

  const loadTodos = async () => {
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={query}
                onUserInputChange={setQuery}
                onUserSelectChange={setSelectFilter}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShow={setSelectedTodo}
                  isSelected={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onExit={setSelectedTodo} />
      )}
    </>
  );
};
