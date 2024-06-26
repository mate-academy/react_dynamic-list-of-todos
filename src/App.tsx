/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setLoading(false));
  }, []);

  const preparedTodos = useMemo(() => {
    return todos
      .filter((todo: Todo) => {
        switch (filterBy) {
          case Filter.ACTIVE:
            return !todo.completed;

          case Filter.COMPLETED:
            return todo.completed;

          default:
            return todo;
        }
      })
      .filter(todo =>
        todo.title.toLowerCase().trim().includes(query.trim().toLowerCase()),
      );
  }, [filterBy, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={preparedTodos}
                  selectedTodoId={selectedTodo?.id}
                  showSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onReset={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
