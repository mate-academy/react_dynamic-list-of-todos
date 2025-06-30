import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Todo } from './types/Todo';
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [modalWindow, isModalWindowOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [query, setQuery] = useState('all');
  const [search, setSearch] = useState('');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleFilter = (todos: Todo[], query: string, search: string) => {
    let filteredTodos = [...todos];

    if (query === 'active') {
      filteredTodos = todos.filter(todo => !todo.completed);

      return filteredTodos.filter(todo =>
        todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
    }

    if (query === 'completed') {
      filteredTodos = todos.filter(todo => todo.completed);

      return filteredTodos.filter(todo =>
        todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
    }

    return todos.filter(todo =>
      todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );
  };

  const visibleTodos = handleFilter(todos, query, search);

  useEffect(() => {
    setLoading(true);
    getTodos().then((res: Todo[]) => {
      setTodos(res);
      setLoading(false);
    });
  }, []);

  const handleSetUser = (userId: number) => {
    setUserLoading(true);
    getUser(userId)
      .then(res => {
        setUser(res);
      })
      .finally(() => {
        isModalWindowOpen(true);
        setUserLoading(false);
      });
  };

  const handleModalWindow = (value: boolean) => {
    isModalWindowOpen(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeQuery={setQuery}
                onChangeSearch={setSearch}
                search={search}
              />
            </div>

            <div className="block">
              <TodoList
                modalWindow={modalWindow}
                todos={visibleTodos}
                loading={loading}
                getCurrentUser={handleSetUser}
                currentTodo={currentTodo}
                setModalWindow={handleModalWindow}
                getCurrentTodo={(value: Todo | null) => setCurrentTodo(value)}
              />
            </div>
          </div>
        </div>
      </div>

      {modalWindow && (
        <TodoModal
          loading={userLoading}
          currentUser={user}
          currentTodo={currentTodo}
          setModalWindow={handleModalWindow}
        />
      )}
    </>
  );
};
