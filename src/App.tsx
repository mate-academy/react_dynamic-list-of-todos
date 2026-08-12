import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

const prepareTodos = (todos: Todo[], filterParam: string, query: string) => {
  return todos
    .filter(item => {
      if (filterParam === 'active') {
        return !item.completed;
      }

      if (filterParam === 'completed') {
        return item.completed;
      }

      return true;
    })
    .filter(item => {
      return query
        ? item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        : true;
    });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [filterParam, setFilterParam] = useState('all');
  const [error, setError] = useState('');

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .catch(err => {
        setError('Failed to load todos.');
        // eslint-disable-next-line no-console
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!todoId) {
      setSelectedUser(null);

      return;
    }

    const currentTodo = todos.find(item => item.id === todoId);

    if (!currentTodo) {
      return;
    }

    setUserLoading(true);
    getUser(currentTodo.userId)
      .then(user => {
        setSelectedUser(user);
      })
      .catch(err => {
        setError('Failed to load user details.');
        // eslint-disable-next-line no-console
        console.error(err);
      })
      .finally(() => setUserLoading(false));
  }, [todoId, todos]);

  const visibleTodos = prepareTodos(todos, filterParam, query);
  const selectedTodo = todos.find(item => item.id === todoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {error && <div className="notification is-danger">{error}</div>}

            <div className="block">
              <TodoFilter
                filterParam={filterParam}
                onChoose={param => setFilterParam(param)}
                onType={param => setQuery(param)}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  todoId={todoId}
                  onClick={id => setTodoId(id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          loading={userLoading}
          onClose={() => setTodoId(0)}
        />
      )}
    </>
  );
};
