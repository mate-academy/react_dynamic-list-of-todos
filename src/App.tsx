import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetTodo = async (loadTodoFunction: () => Promise<Todo[]>) => {
    const todos = await loadTodoFunction();

    setData(todos);
  };

  const visibleTodos = data.filter((todo) => {
    if (todo.title.includes(input)) {
      switch (status) {
        case 'completed':
          return !todo.completed;
        case 'active':
          return todo.completed;
        case 'all':
        default:
          return true;
      }
    }

    return false;
  });

  useEffect(() => {
    handleGetTodo(getTodos);
  }, []);

  const clearInput = () => {
    setInput('');
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setStatus(value);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInput(value);
  };

  async function handleUserLoad(
    loadUserFunc: (userId: number) => Promise<User>,
  ) {
    if (userId === null || userId === 0) {
      return;
    }

    const loadedUser = await loadUserFunc(userId);

    setUser(loadedUser);
    setIsLoading(false); // *stop spinners in TodoModal component
  }

  useEffect(() => {
    handleUserLoad(getUser);
  }, [userId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                input={input}
                status={status}
                onChangeStatus={handleChangeStatus}
                onChangeInput={handleChangeInput}
                onClearInput={clearInput}
              />
            </div>

            <div className="block">
              {data.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    onSelectUserId={setUserId}
                    selectedUserId={userId}
                    onSelectTodo={setSelectedTodo}
                    onIsLoading={setIsLoading}
                  />
                ) : (
                  <Loader />
                )}

            </div>
          </div>
        </div>
      </div>

      {!!selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            user={user}
            onSetUser={setUser}
            onSelectUserId={setUserId}
            onSelectTodo={setSelectedTodo}
            isLoading={isLoading}
          />
        )}
    </>
  );
};
