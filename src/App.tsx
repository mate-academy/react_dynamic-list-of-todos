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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>();
  const [user, setUser] = useState<User>();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [isTodoModalVisible, setIsTodoModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [todoId, setTodoId] = useState(0);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      setLoadingUser(true);
      getUser(selectedUserId)
        .then(setUser)
        .finally(() => setLoadingUser(false));
    }
  }, [selectedUserId]);

  const visibleTodos = todos.filter(tod => {
    if (status === 'active') {
      return !tod.completed;
    }

    if (status === 'completed') {
      return tod.completed;
    }

    return true;
  });

  const filteredTodos = visibleTodos.filter(tod =>
    tod.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                search={search}
                onSearch={setSearch}
                onSetStatus={setStatus}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}
              <TodoList
                todos={filteredTodos}
                onSelectedUserId={setSelectedUserId}
                onSetTodo={setTodo}
                onShowTodoOfUser={setIsTodoModalVisible}
                todoId={todoId}
                onTodoId={setTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {todo && isTodoModalVisible && (
        <TodoModal
          todo={todo}
          user={user}
          loadingUser={loadingUser}
          onShowTodoOfUser={setIsTodoModalVisible}
          onTodoId={setTodoId}
        />
      )}
    </>
  );
};
