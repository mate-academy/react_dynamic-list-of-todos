/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUsers } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Todo } from './types/Todo';

type FullTodo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};

type CurrentFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [visibleModal, setVisibleModal] = useState<FullTodo | null>(null);
  const [filter, setFilter] = useState<CurrentFilter>('all');
  const [query, setQuery] = useState<string>('');

  const [fullTodos, setFullTodos] = useState<FullTodo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const getCurrentUser = (userId: number) => {
    const user = users.find(currentUser => currentUser.id === userId);

    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      };
    } else {
      return null;
    }
  };

  const getFullTodos = () => {
    let result = [
      ...todos.map(todo => ({ ...todo, user: getCurrentUser(todo.userId) })),
    ].sort((a, b) => a.id - b.id);

    if (query) {
      result = result.filter(item =>
        item.title.includes(query.toLocaleLowerCase().trim()),
      );
    }

    if (filter === 'completed') {
      return result.filter(item => item.completed);
    }

    if (filter === 'active') {
      return result.filter(item => !item.completed);
    }

    return result;
  };

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      getTodos()
        .then(responses => {
          if (todos.length === 0) {
            setTodos([...todos, ...responses]);
          } else {
            todos.length = 0;
            setTodos([...todos, ...responses]);
          }
        })
        .finally(() => {
          setLoader(false);
        });

      getUsers().then(res => {
        if (users.length === 0) {
          setUsers([...users, ...res]);
        } else {
          users.length = 0;
          setUsers([...users, ...res]);
        }
      });

      setFullTodos(getFullTodos());
    }, 1000);
  }, [filter]);

  useEffect(() => {
    setFullTodos(getFullTodos());
  }, [query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterValue={newValue => setFilter(newValue)}
                query={query}
                changeQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}

              {!loader && (
                <TodoList
                  todos={fullTodos}
                  visibleModal={visibleModal}
                  setVisibleTodo={modal => setVisibleModal(modal)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {visibleModal && (
        <TodoModal
          visibleModal={visibleModal}
          setVisibleTodo={modal => setVisibleModal(modal)}
        />
      )}
    </>
  );
};
