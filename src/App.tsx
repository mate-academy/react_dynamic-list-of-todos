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
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [search, setSearch] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('all');

  const todosFiltered = todos.filter(todo => {
    const filteredBySearch = todo.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    let filteredByOption;

    if (selectedOption === 'all') {
      filteredByOption = todo;
    }

    if (selectedOption === 'active') {
      filteredByOption = !todo.completed;
    }

    if (selectedOption === 'completed') {
      filteredByOption = todo.completed;
    }

    return filteredBySearch && filteredByOption;
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
                onSearchChange={setSearch}
                onOptionChange={setSelectedOption}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todosFiltered}
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
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
