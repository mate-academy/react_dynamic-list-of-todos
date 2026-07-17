/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export type Filter = 'all' | 'active' | 'completed';
export type ModalData = {
  user: User;
  todo: Todo;
} | null;

const refreshTodoList = (list: Todo[], query: string, filter: Filter) => {
  let processedList = list;

  if (query !== '') {
    const normalizedQuery = query.toLowerCase();

    processedList = processedList.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  if (filter !== 'all') {
    const shouldBeCompleted = filter === 'completed';

    processedList = processedList.filter(
      todo => todo.completed === shouldBeCompleted,
    );
  }

  return processedList;
};

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [todosError, setTodosError] = useState(false);
  const [userError, setUserError] = useState(false);

  const [originalList, setOriginalList] = useState<Todo[]>([]);
  const todoList = useMemo<Todo[]>(
    () => refreshTodoList(originalList, query, filter),
    [query, filter, originalList],
  );

  const [openedTodoId, setOpenedTodoId] = useState<number | null>(null);
  const [modalData, setModalData] = useState<ModalData>(null);

  const handleCloseModal = () => {
    setOpenedTodoId(null);
    setModalData(null);
    setUserError(false);
  };

  useEffect(() => {
    setLoadingTodos(true);
    setTodosError(false);
    getTodos()
      .then(setOriginalList)
      .catch(() => setTodosError(true))
      .finally(() => setLoadingTodos(false));
  }, []);

  useEffect(() => {
    if (openedTodoId !== null) {
      const targetTodo = originalList.find(todo => todo.id === openedTodoId);

      if (!targetTodo) {
        return;
      }

      setLoadingUsers(true);
      setUserError(false);

      getUser(targetTodo.userId)
        .then(userData => {
          setModalData({
            user: userData,
            todo: targetTodo,
          });
        })
        .catch(() => setUserError(true))
        .finally(() => setLoadingUsers(false));
    }
  }, [openedTodoId, originalList]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}

              {todosError && !loadingTodos && (
                <p className="has-text-danger">Failed to load todos</p>
              )}

              {!loadingTodos && !todosError && (
                <TodoList
                  todos={todoList}
                  openedTodoId={openedTodoId}
                  setOpenedTodoId={setOpenedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isActive={openedTodoId !== null}
        isLoading={loadingUsers}
        hasError={userError}
        modalData={modalData}
        onClose={handleCloseModal}
      />
    </>
  );
};
