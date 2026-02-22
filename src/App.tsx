/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { useState } from 'react';
import { useEffect } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    filter: 'all',
    search: '',
  });

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const openTodo = async (selectedTodo: Todo) => {
    try {
      setLoading(true);
      setTodo(todo);

      const userFromServer = await getUser(selectedTodo.userId);

      setUser(userFromServer);
    } finally {
      setLoading(false);
    }
  };

  const closeTodo = () => {
    setTodo(null);
    setUser(null);
  };

  const filteredTodos = () => {
    let copyTodos = [...todos];

    switch (filters.filter) {
      case 'active':
        copyTodos = copyTodos.filter(item => !item.completed);
        break;
      case 'completed':
        copyTodos = copyTodos.filter(item => item.completed);
        break;
      default:
        break;
    }

    copyTodos = copyTodos.filter(item => item.title.includes(filters.search));

    return copyTodos;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filters={filters} setFilters={setFilters} />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos()} openTodo={openTodo} />
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoModal
        todo={todo}
        user={user}
        loading={loading}
        closeTodo={closeTodo}
      />
    </>
  );
};
