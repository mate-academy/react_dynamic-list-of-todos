/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useEffect } from 'react';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  enum Filter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
  }

  const [filter, setFilter] = React.useState<Filter>(Filter.All);
  const [query, setQuery] = React.useState('');
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [todosLoading, setTodosLoading] = React.useState(false);
  const [userLoading, setUserLoading] = React.useState(false);
  const filteredTodos = todos
    .filter(todo => {
      if (filter === Filter.Active) {
        return !todo.completed;
      }

      if (filter === Filter.Completed) {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleFilterChange = (newFilter: string) => {
    if (newFilter === Filter.Active) {
      setFilter(Filter.Active);
    } else if (newFilter === Filter.Completed) {
      setFilter(Filter.Completed);
    } else {
      setFilter(Filter.All);
    }
  };

  const handleShow = (todo: Todo) => {
    setUser(null);
    setSelectedTodo(todo);

    setUserLoading(true);
    getUser(todo.userId)
      .then(userFromServer => {
        setUser(userFromServer);
      })
      .catch(error => {
        window.console.error(error);
      })
      .finally(() => setUserLoading(false));
  };

  const handleClose = () => {
    setSelectedTodo(null);
    setUser(null);
    setUserLoading(false);
  };

  useEffect(() => {
    setTodosLoading(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(error => {
        window.console.error(error);
      })
      .finally(() => setTodosLoading(false));
  }, []);

  return (
    <div className="App">
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {!todosLoading && (
                <TodoFilter
                  filter={filter}
                  query={query}
                  onFilterChange={handleFilterChange}
                  onQueryChange={handleQueryChange}
                  onClearQuery={handleClearQuery}
                />
              )}
            </div>

            <div className="block">
              {todosLoading && <Loader />}
              {!todosLoading && (
                <TodoList
                  todos={filteredTodos}
                  onShow={handleShow}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>

            {selectedTodo !== null && (
              <TodoModal
                completed={selectedTodo.completed}
                userName={user ? user.name : 'User'}
                userEmail={user ? user.email : ''}
                todo={selectedTodo}
                isLoading={userLoading}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
