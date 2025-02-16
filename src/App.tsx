/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function getPreparedTodos(todoList: Todo[], select: string, query: string) {
  const visbleTodos = [...todoList];

  switch (true) {
    case select === 'active': {
      if (query) {
        return visbleTodos
          .filter(todo => !todo.completed)
          .filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
      }

      return visbleTodos.filter(todo => !todo.completed);
    }

    case select === 'completed': {
      if (query) {
        return visbleTodos
          .filter(todo => todo.completed)
          .filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
      }

      return visbleTodos.filter(todo => todo.completed);
    }

    case select === 'all': {
      if (query) {
        return visbleTodos.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      return visbleTodos;
    }

    default:
      return visbleTodos;
  }
}

export const App: React.FC = () => {
  const [filterValues, setFilterValues] = useState('all');
  const [searchTodos, setSearchTodos] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [infoTodo, setInfoTodo] = useState<Todo | null>(null);
  const [currentTodo, setCurrentTodo] = useState(false);

  useEffect(() => {
    setCurrentTodo(true);
    const fetchTodos = async () => {
      try {
        const todosList = await getTodos();

        setTodos(todosList);
      } catch (error) {
        throw new Error('Missing todos-Data');
      }
    };

    fetchTodos().finally(() => setCurrentTodo(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return getPreparedTodos(todos, filterValues, searchTodos);
  }, [filterValues, searchTodos, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchTodos={searchTodos}
                setSearchTodos={setSearchTodos}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
              />
            </div>

            <div className="block">
              {currentTodo ? (
                <Loader />
              ) : (
                <TodoList
                  visibleTodos={visibleTodos}
                  infoTodo={infoTodo}
                  setInfoTodo={setInfoTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {infoTodo && <TodoModal infoTodo={infoTodo} setInfoTodo={setInfoTodo} />}
    </>
  );
};
