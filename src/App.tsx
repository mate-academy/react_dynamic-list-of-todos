/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { debounce } from './utils/debounce';
import { SelectFilter } from './types/SelectFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [loader, setLoader] = useState(true);
  const [chosenTodo, setChosenTodo] = useState<Todo | null>(null);

  const [filterType, setFilterType] = useState(SelectFilter.All);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => new Error('Sorry todos not found.'))
      .finally(() => setLoader(false));
  }, []);

  const handleChosenTodo = useCallback((arg: null | Todo) => {
    setChosenTodo(arg);
  }, []);

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const visibleTodos = useMemo(() => {
    const filtered = todos.filter(todo => (
      todo.title.toLowerCase().includes(appliedQuery.toLowerCase())
    ));

    return filtered.filter(todo => {
      switch (filterType) {
        case SelectFilter.Completed:
          return todo.completed;

        case SelectFilter.Active:
          return !todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, filterType, appliedQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                setFilterType={setFilterType}
                query={query}
                setQuery={setQuery}
                applyQuery={applyQuery}
                cleanQuery={setAppliedQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}

              {(todos.length) && (
                <TodoList
                  todos={visibleTodos}
                  chosenTodo={chosenTodo}
                  handleChosenTodo={handleChosenTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {
        chosenTodo && (
          <TodoModal chosenTodo={chosenTodo} handleChosenTodo={handleChosenTodo} />
        )
      }
    </>
  );
};
