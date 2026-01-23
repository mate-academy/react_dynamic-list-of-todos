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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');
  const [option, setOption] = useState<string>('all');

  const filteredTodos = todos.filter(todo => {
    const normalizedSearch = todo.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    let matchesOption = true;

    if (option === 'active') {
      matchesOption = !todo.completed;
    }

    if (option === 'completed') {
      matchesOption = todo.completed;
    }

    return normalizedSearch && matchesOption;
  });

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onOptionChange={setOption}
                onSearchChange={setSearch}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelected={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClosed={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
