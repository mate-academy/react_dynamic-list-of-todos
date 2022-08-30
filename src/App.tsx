/* eslint-disable max-len */
import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

const debounce = (f: (searchQuery: string) => void, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);

    timerId = window.setTimeout(f, delay, ...args);
  };
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todosFilter, setTodosFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosList => setTodos(todosList));
  }, []);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 500), [],
  );

  const filterTodos = useCallback(
    (todosList: Todo[] | null, filterQuery: string) => {
      if (!todosList) {
        return null;
      }

      return todosList.filter(todo => {
        switch (todosFilter) {
          case 'all':
            return todo.title.toLowerCase().includes(filterQuery.toLowerCase());

          case 'active':
            return !todo.completed
              && todo.title.toLowerCase().includes(filterQuery.toLowerCase());

          case 'completed':
            return todo.completed
              && todo.title.toLowerCase().includes(filterQuery.toLowerCase());

          default:
            return todo;
        }
      });
    },
    [todos, todosFilter],
  );

  const filteredTodos = useMemo(() => filterTodos(todos, appliedQuery), [todos, todosFilter]);

  const closeModal = () => setSelectedTodo(null);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setTodosFilter={setTodosFilter}
                todosFilter={todosFilter}
                searchQuery={searchQuery}
                setQuery={setSearchQuery}
                applyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {!todos && <Loader />}

              {filteredTodos && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id || null}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={closeModal}
        />
      )}
    </>
  );
};
