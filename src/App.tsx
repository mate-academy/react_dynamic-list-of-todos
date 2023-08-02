/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const getVisibleTodos = (
  todoList: Todo[],
  queryString: string,
  filter: string,
) => {
  let result = [...todoList];

  if (queryString) {
    result = result.filter(todo => {
      return todo.title
        .toLowerCase()
        .includes(queryString.toLowerCase());
    });
  }

  switch (filter) {
    case Filter.ALL:
      break;
    case Filter.ACTIVE:
      result = result.filter(todo => todo.completed === false);
      break;
    case Filter.COMPLETED:
      result = result.filter(todo => todo.completed === true);
      break;
    default:
      break;
  }

  return result;
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<Filter>(Filter.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleFilterChange = (value: Filter) => {
    setFilterBy(value);
  };

  const handleSelectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, query, filterBy),
    [todos, query, filterBy],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterBy={filterBy}
                handleQueryChange={handleQueryChange}
                handleFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={handleSelectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} selectTodo={handleSelectTodo} />
      )}
    </>
  );
};
