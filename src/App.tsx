import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/filterType';

const debounce = (func: (arg: string) => void, delay = 300) => {
  let timerId: number;

  return (...args: string[]) => {
    clearInterval(timerId);

    timerId = window.setTimeout(func, delay, ...args);
  };
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState(FilterType.All);
  const [inputValue, setinputValue] = useState('');
  const [appliedInputValue, setApliedInputValue] = useState('');

  useEffect(() => {
    getTodos()
      .then(response => setTodos(response))
      .finally(() => setIsLoading(false));
  }, []);

  const applyInputValue = useCallback(debounce(setApliedInputValue), []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const { title, completed } = todo;
      const checkInput = title
        .toLowerCase()
        .includes(inputValue.toLowerCase());

      switch (filterType) {
        case FilterType.All:
          return checkInput;
        case FilterType.Active:
          return checkInput && !completed;
        case FilterType.Completed:
          return checkInput && completed;
        default:
          return true;
      }
    });
  }, [todos, appliedInputValue, filterType]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={inputValue}
                filterType={filterType}
                onFilter={setFilterType}
                onInputChange={setinputValue}
                onAppliedInputChange={applyInputValue}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
