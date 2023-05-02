/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todoIsLoaded, setTodoisLoaded] = useState(false);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });
  const [filterTodoBy, setFilterTodoBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterCallback = () => {
    switch (filterTodoBy) {
      case 'active':
        return (todo: Todo) => !todo.completed;

      case 'completed':
        return (todo: Todo) => todo.completed;

      case 'byQuery':
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
                todos={getTodos}
                isLoaded={todoIsLoaded}
                setIsLoaded={setTodoisLoaded}
                setModalIsOpened={setModalIsOpened}
                setCurrentUserId={setCurrentUserId}
                setCurrentTodo={setCurrentTodo}
                filterCallback={filterCallback()}
              />
            </div>
          </div>
        </div>
      </div>

      {modalIsOpened
        && (
          <TodoModal
            setModalIsOpened={setModalIsOpened}
            currentUserId={currentUserId}
            getUser={getUser}
            currentTodo={currentTodo}
          />
        )}
    </>
  );
};
