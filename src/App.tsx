/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
// eslint-disable-next-line import/no-cycle
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getUser } from './api';
import { Todo } from './types/Todo';

export enum FilterBy {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  QUERY = 'byQuery',
}

export const App: React.FC = () => {
  const [todoIsLoaded, setTodoisLoaded] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });
  const [filterTodoBy, setFilterTodoBy] = useState(FilterBy.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  const filterCallback = () => {
    switch (filterTodoBy) {
      case FilterBy.ACTIVE:
        return (todo: Todo) => !todo.completed;

      case FilterBy.COMPLETED:
        return (todo: Todo) => todo.completed;

      case FilterBy.QUERY:
        return (todo: Todo) => todo.title.includes(searchQuery);

      default:
        return (todo: Todo) => todo.id !== 0;
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterTodoBy={setFilterTodoBy}
                filterTodoBy={filterTodoBy}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {!todoIsLoaded && <Loader />}
              <TodoList
                isLoaded={todoIsLoaded}
                setIsLoaded={setTodoisLoaded}
                setCurrentUserId={setCurrentUserId}
                setCurrentTodo={setCurrentTodo}
                filterCallback={filterCallback()}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo.id !== 0
        && (
          <TodoModal
            currentUserId={currentUserId}
            getUser={getUser}
            currentTodo={currentTodo}
            setCurrentTodo={setCurrentTodo}
          />
        )}
    </>
  );
};
