/* eslint-disable max-len */
import React, {
  useEffect,
  useMemo,
  useState,
  Dispatch,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const normalizeValue = (value: string) => value.toLowerCase();

const debounce = (callback: Dispatch<string>, delay: number) => {
  let timeoutId: number;

  return (...args: string[]) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(callback, delay, ...args);
  };
};

enum FilterStatus {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 300),
    [],
  );

  const handleOnCloseModal = () => {
    setSelectedTodo(null);
  };

  const todosFilteredByStatus = useMemo(() => {
    return todos.filter(todo => {
      switch (filterStatus) {
        case FilterStatus.active:
          return !todo.completed;

        case FilterStatus.completed:
          return todo.completed;

        case FilterStatus.all:
        default:
          return true;
      }
    });
  }, [filterStatus, todos]);

  const todosFilteredByTitle = useMemo(() => {
    return todosFilteredByStatus.filter(todo => {
      const normalizedTitle = normalizeValue(todo.title);
      const normalizedQuery = normalizeValue(appliedQuery.trim());

      return normalizedTitle.includes(normalizedQuery);
    });
  }, [todosFilteredByStatus, appliedQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={filterStatus}
                onSelectStatus={setFilterStatus}
                onApplyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={todosFilteredByTitle}
                onSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={handleOnCloseModal}
        />
      )}
    </>
  );
};
