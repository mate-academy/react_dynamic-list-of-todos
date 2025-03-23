/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [querySearch, setQuerySearch] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [selectUser, setSelectUser] = useState(null);
  const [userLoad, setUserLoad] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const handleShowUser = (userId: number) => {
    setUserLoad(true);
    setIsModal(true);

    getUser(userId)
      .then(setSelectUser)
      .catch(() => alert('No download user'))
      .finally(() => setUserLoad(false));
  };

  const handleSelectPost = (todo: {  id: number; title: string, userId: number}) => {
    setSelectedTodoId(prevId => (prevId === todo.id ? null : todo.id));
    setSelectedTodo(todo);
    handleShowUser(todo.userId);
  };

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodo)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(
        t =>
          filter === 'all' ||
          (filter === 'active' && !t.completed) ||
          (filter === 'completed' && t.completed),
      )
      .filter(t => t.title.toLowerCase().includes(querySearch.toLowerCase()));
  }, [todos, filter, querySearch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                search={querySearch}
                setSearch={setQuerySearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todo={filteredTodos}
                  handleSelectPost={handleSelectPost}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {
        <TodoModal
          selectedTodo={selectedTodo}
          modal={isModal}
          setModal={setIsModal}
          loading={userLoad}
          selectUser={selectUser}
          setSelectedTodo={setSelectedTodoId}
        />
      }
    </>
  );
};
