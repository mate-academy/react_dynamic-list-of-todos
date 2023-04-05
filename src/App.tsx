/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToShow, setTodosToShow] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.ALL);
  const [query, setQuery] = useState<string>('');

  const renderTodoList = () => {
    if (!isLoadingTodos && todosToShow.length > 0) {
      return (
        <TodoList
          todos={todosToShow}
          activeTodo={activeTodo}
          setActiveTodo={setActiveTodo}
        />
      );
    }

    if (hasError) {
      return 'Error occured while loading todos!';
    }

    if (!isLoadingTodos && !todosToShow.length) {
      return 'Todos are not found!';
    }

    return (<Loader />);
  };

  const loadTodos = async () => {
    try {
      setHasError(false);
      setIsLoadingTodos(true);
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setTodosToShow([...todosFromServer]);
      setIsLoadingTodos(false);
    } catch {
      setIsLoadingTodos(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = todos
      .filter(todo => {
        switch (filterBy) {
          case Filter.ALL:
            return true;
          case Filter.ACTIVE:
            return !todo.completed;
          case Filter.COMPLETED:
            return todo.completed;
          default:
            return false;
        }
      })
      .filter(todo => todo.title.includes(query.toLowerCase()));

    setTodosToShow(filteredTodos);
  }, [filterBy, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {renderTodoList()}
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
