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
  const [filterTodos, setFilterTodos] = useState<Todo[]>([]);
  const [sortMethod, setSortMethod] = useState('all');
  const [applieQuery, setApplieQuery] = useState('');
  const [iLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [visibiliteComponent, setVisibiliteComponent] = useState(false);

  const apllyQuery = useCallback(
    debounce(setApplieQuery, DEBOUNCE_DELAY),
    [],
  );

  const handleFilterChange = (methodSort: string) => {
    setSortMethod(methodSort);
  };

  const handleQueryText = (queryText: string) => {
    apllyQuery(queryText);
  };

  useEffect(() => {
    const newFilterTodos = todos.filter(todo => {
      switch (sortMethod) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    }).filter(todo => {
      return todo.title.toLowerCase().includes(applieQuery.toLowerCase());
    });

    setFilterTodos(newFilterTodos);
  }, [todos, sortMethod, applieQuery]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
        setFilterTodos(loadedTodos);
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
              {iLoading && <Loader />}
              <TodoList
                errorMessage={errorMessage}
                todos={filterTodos}
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
