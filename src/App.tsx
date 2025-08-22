/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

function preperedData(
  dataTodos: Todo[],
  groupBy: string,
  searchQuery: string,
): Todo[] {
  let visibleTodos = [...dataTodos];

  visibleTodos = visibleTodos.filter((todos: Todo) => {
    switch (groupBy) {
      case 'active':
        return todos.completed === false;

      case 'completed':
        return todos.completed === true;

      default:
        return true;
    }
  });

  if (searchQuery) {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    visibleTodos = visibleTodos.filter(todos => {
      return todos.title.toLowerCase().includes(normalizedQuery);
    });
  }

  return visibleTodos.sort((a, b) => a.id - b.id);
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [groupBy, setGroupBy] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingStartWindow, setLoadingStartWindow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<User>();
  const [choosenTodoData, setChoosenTodoData] = useState<Todo>();
  const [error, setError] = useState<Error | null>(null);
  const [showEyeButton, setShowEyeButton] = useState(true);
  const [clickedTodoId, setClickedTodoId] = useState<number | null>(null);

  const visibleData = preperedData(todos, groupBy, searchQuery);

  useEffect(() => {
    setLoadingStartWindow(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch((err: Error) => setError(err))
      .finally(() => setLoadingStartWindow(false));
  }, []);

  const handleOptionSort = (event: 'all' | 'active' | 'completed') => {
    setGroupBy(event);
  };

  const handleSetSearchQuery = (event: string) => {
    setSearchQuery(event);
  };

  const handleResetQuery = () => {
    setSearchQuery('');
  };

  const handleChoosenDataTodo = (todo: Todo) => {
    setClickedTodoId(todo.id);
    setShowEyeButton(false);
    setOpenModal(true);
    setLoadingModal(true);
    getUser(todo.userId)
      .then(userFromServer => {
        setUser(userFromServer);
        setChoosenTodoData(todo);
      })
      .catch((err: Error) => setError(err))
      .finally(() => setLoadingModal(false));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowEyeButton(true);
    setClickedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleOptionSort={handleOptionSort}
                searchQuery={searchQuery}
                handleSetSearchQuery={handleSetSearchQuery}
                handleResetQuery={handleResetQuery}
                groupBy={groupBy}
              />
            </div>

            <div className="block">
              {loadingStartWindow && <Loader />}
              <TodoList
                todos={visibleData}
                handleChoosenDataTodo={handleChoosenDataTodo}
                showEyeButton={showEyeButton}
                clickedTodoId={clickedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        loadingModal={loadingModal}
        openModal={openModal}
        user={user}
        choosenTodoData={choosenTodoData}
        handleCloseModal={handleCloseModal}
      />
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </>
  );
};
