/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './services/todos';
import { FilterTodos } from './types/FilterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [filterTodos, setFilterTodos] = useState('all');

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .catch(() => setErrorMessage('There are no todos'))
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  const filteredTodos = useMemo(() => {
    const visibleTodos = filterTodos === FilterTodos.All
      ? todos
      : todos.filter(todo => {
        switch (filterTodos) {
          case FilterTodos.Active:
            return !todo.completed;

          case FilterTodos.Completed:
            return todo.completed;

          default:
            return false;
        }
      });

    return visibleTodos.filter(todo => todo.title.toLocaleLowerCase().includes(appliedQuery.toLocaleLowerCase()));
  }, [appliedQuery, filterTodos, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter findTodo={setAppliedQuery} filterTodos={setFilterTodos} />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
            {errorMessage && (
              <p className="notification is-danger">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          selectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
