/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { SelectedFilterState } from './types/SelectedFilterState';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [selectedFilter, setSelectedFilter] = useState(SelectedFilterState.All);
  const [query, setQuery] = useState('');

  const filteredTodos = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();

    return todos
      .filter(todo => {
        switch (selectedFilter) {
          case SelectedFilterState.Active:
            return !todo.completed;
          case SelectedFilterState.Completed:
            return todo.completed;
          default:
            return true;
        }
      })
      .filter(todo => (
        todo.title.toLowerCase().includes(lowerCaseQuery)
      ));
  }, [selectedFilter, query, todos]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>
            <div className="block">
              {loading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={selectedTodo?.id}
                    onSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
        />
      )}

    </>
  );
};
