/* eslint-disable no-console */
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
  const [todosAreLoading, setTodosAreLoading] = useState<boolean>(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.ALL);
  const [query, setQuery] = useState<string>('');

  const handleTodoListLoad = () => {
    if (!todosAreLoading && todosToShow.length > 0) {
      return (
        <TodoList
          todos={todosToShow}
          activeTodo={activeTodo}
          setActiveTodo={setActiveTodo}
        />
      );
    }

    if (!todosAreLoading && todosToShow.length === 0) {
      return 'Todos are not found!';
    }

    return (<Loader />);
  };

  const loadTodos = async () => {
    setTodosAreLoading(true);
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setTodosToShow([...todosFromServer]);
    setTodosAreLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = todos
      .filter(todo => {
        switch (filterBy) {
          case 'all':
            return true;
          case 'active':
            return !todo.completed;
          case 'completed':
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
              {handleTodoListLoad()}
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
