/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

type DataSort = {
  sortType: SortType;
  query: string;
};

export function filterTodos(todos: Todo[], { sortType, query }: DataSort) {
  let filteredTodos;

  switch (sortType) {
    case SortType.ACTIVE:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case SortType.COMPLETED:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      filteredTodos = todos;
      break;
  }

  if (query) {
    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  }

  return filteredTodos;
}

const debounce = (f: (...args: string[]) => void, delay: number) => {
  let timerId: NodeJS.Timeout;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      f(...args);
    }, delay);
  };
};

const DEBOUNCE_DELAY = 1000;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.ALL);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [visibiliteComponent, setVisibiliteComponent] = useState(false);

  const apllyQuery = useCallback(
    debounce(setQuery, DEBOUNCE_DELAY),
    [],
  );

  const handleFilterChange = (methodSort: SortType) => {
    switch (methodSort) {
      case SortType.ACTIVE:
        setSortType(SortType.ACTIVE);
        break;

      case SortType.COMPLETED:
        setSortType(SortType.COMPLETED);
        break;

      default:
        setSortType(SortType.ALL);
    }
  };

  const handleQueryText = (queryText: string) => {
    apllyQuery(queryText);
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }

        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = filterTodos(todos, { sortType, query });

  const choiseTodo = (todoId: number) => {
    setVisibiliteComponent(true);

    const findTodo = todos.find(todo => todo.id === todoId);

    if (findTodo) {
      setSelectTodo(findTodo);
    }
  };

  const closeTodo = () => {
    setVisibiliteComponent(false);
    setSelectTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterChange={handleFilterChange}
                textChange={handleQueryText}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                errorMessage={errorMessage}
                todos={visibleTodos}
                handleClick={choiseTodo}
                selectTodo={selectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {visibiliteComponent && selectTodo && <TodoModal todo={selectTodo} handleClick={closeTodo} />}
    </>
  );
};
