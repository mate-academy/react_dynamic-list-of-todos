import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';

import { User } from './types/User';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('all');

  const handleToDoClick = (userId: number) => {
    setIsUserLoading(true);
    getUser(userId).then((userData: User) => {
      setUser(userData);
      setIsUserLoading(false);
    }).catch(() => {
      setIsUserLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos().then((data: Todo[]) => {
      setTodos(data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  const handleShowClick = (todo: Todo) => {
    setSelectedTodo(todo);
    handleToDoClick(todo.userId);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter setFilter={setFilter} />
            </div>
            <div className="block">
              {isLoading
                ? <Loader />
                // eslint-disable-next-line max-len
                : <TodoList todos={filteredTodos} onShowClick={handleShowClick} />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          isUserLoading={isUserLoading}
          user={user}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
