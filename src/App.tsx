import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [query, setQuery] = useState('all');
  const [search, setsearch] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState(0);

  const handleFilter = (to: Todo[], qu: string, ser: string) => {
    const filteredTodos = [...to];

    if (qu === 'active') {
      return filteredTodos
        .filter((t: Todo) => !t.completed)
        .filter(t => t.title.toLowerCase().includes(ser.toLowerCase()));
    }

    if (qu === 'completed') {
      return filteredTodos
        .filter((t: Todo) => t.completed)
        .filter(t => t.title.toLowerCase().includes(ser.toLowerCase()));
    } else {
      return filteredTodos.filter(t =>
        t.title.toLowerCase().includes(ser.toLowerCase()),
      );
    }
  };

  const currentTodos = handleFilter(todos, query, search);

  useEffect(() => {
    setLoading(true);
    getTodos().then((res: Todo[]) => {
      setTodos(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedUser !== 0) {
      setUserLoading(true);
      getUser(selectedUser).then((res: User) => {
        setUser(res);
        setUserLoading(false);
      });
    }
  }, [selectedUser]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                setSearch={setsearch}
                search={search}
              />
            </div>

            <div className="block">
              <TodoList
                todos={currentTodos}
                loading={loading}
                setSelectedTodo={setSelectedTodo}
                setSelectedUser={setSelectedUser}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          userLoading={userLoading}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
