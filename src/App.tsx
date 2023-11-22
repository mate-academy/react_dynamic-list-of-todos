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
import { Status } from './types/Status';

const filterTodos = (currentTodos: Todo[], filterType: Status, query: string) => {
  let filteredTodos = [...currentTodos];

  if (filterType !== Status.All) {
    if (filterType !== Status.Active) {
      filteredTodos = filteredTodos.filter(item => item.completed);
    } else {
      filteredTodos = filteredTodos.filter(item => !item.completed);
    }
  }

  if (query) {
    const trimmedQuery = query.trim().toLowerCase();

    filteredTodos = filteredTodos.filter(item => item.title.toLowerCase().includes(trimmedQuery));
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Status.All);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = filterTodos(todos, filter, query);

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
                onFilterChange={setFilter}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={setSelectedTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseTodoModal={setSelectedTodo}
        />
      )}
    </>
  );
};
