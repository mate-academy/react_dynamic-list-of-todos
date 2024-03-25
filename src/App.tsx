/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

type Params = {
  query: string;
  filterField: string;
};

enum FieldType {
  active = 'active',
  completed = 'completed',
  all = 'all',
}

const getPreparedTodos = (todos: Todo[], { query, filterField }: Params) => {
  let preparedTodos = [...todos];
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  switch (filterField) {
    case FieldType.active:
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
      break;
    case FieldType.completed:
      preparedTodos = preparedTodos.filter(todo => todo.completed);
      break;
    default:
      return preparedTodos;
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(true);
  const [selectFilter, setSelectFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(data =>
        getPreparedTodos(data, { query, filterField: selectFilter }),
      )
      .then(data => {
        setTodos(data || []);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error('fetch error', error))
      .finally(() => setLoader(false));
  }, [selectFilter, query]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { value } = e.target;

    if (value) {
      setSelectFilter(value);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleShow = (id: number): void => {
    const todo = todos.find(to => to.id === id);

    if (todo) {
      if (activeTodoId === id) {
        setActiveTodoId(null);
      } else {
        setSelectedTodo(todo);
        setActiveTodoId(id);
      }
    }

    if (todo && todo.userId) {
      setLoader(true);
      getUser(todo.userId)
        .then(fetchedUser => {
          setSelectedUser(fetchedUser);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch user details:', error);
          setSelectedUser(null);
        })
        .finally(() => setLoader(false));
    }
  };

  const handleCloseModal = () => {
    setActiveTodoId(null);
  };

  const handleDelete = () => {
    setQuery('');
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={handleSelect}
                onInput={handleInput}
                selectFilter={selectFilter}
                query={query}
                onDelete={handleDelete}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              {!loader && (
                <TodoList
                  todos={todos}
                  onShown={handleShow}
                  activeTodoId={activeTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodoId && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleCloseModal}
          user={selectedUser}
        />
      )}
    </>
  );
};
