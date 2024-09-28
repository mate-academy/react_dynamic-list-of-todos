/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos} from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(Filter.All);
  const [searchValue, setSearchValue] = useState('');
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const handleEyeChange = (id: number) => {
    setActiveTodo(todos.find(todo => todo.id === id) || null);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => todo.title.includes(searchValue));
  }, [todos, searchValue]);

  const getVisibleTodos = () => {
    switch (filter) {
      case Filter.All:
        return filteredTodos;
      case Filter.Active:
        return filteredTodos.filter(todo => !todo.completed);
      case Filter.Completed:
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && (
                <TodoList
                  handleEyeChange={handleEyeChange}
                  visibleTodos={getVisibleTodos()}
                  activeTodo={activeTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          setActiveTodo={setActiveTodo}
        />
      )}
    </>
  );
};
