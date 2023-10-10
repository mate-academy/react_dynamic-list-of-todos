/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodosContext } from './components/TodosContext';
import { Status } from './types/Status';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const { shownTodo, filter } = useContext(TodosContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const getVisibleTodos = (allTodos: Todo[], visibleFilter: Filter) => {
    let shownTodos: Todo[] = [];

    switch (visibleFilter.global) {
      case Status.All:
        shownTodos = [...allTodos];
        break;

      case Status.Active:
        shownTodos = allTodos.filter(todo => !todo.completed);
        break;

      case Status.Completed:
        shownTodos = allTodos.filter(todo => todo.completed);
        break;

      default:
        throw new Error('Unknown filter!');
    }

    if (visibleFilter.query) {
      const lowerQuery = visibleFilter.query.toLowerCase();

      shownTodos = shownTodos.filter(todo => {
        const lowerTitle = todo.title.toLowerCase();

        return lowerTitle.includes(lowerQuery);
      });
    }

    return shownTodos;
  };

  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}
              <TodoList todos={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {shownTodo && (
        <TodoModal />
      )}
    </>
  );
};
