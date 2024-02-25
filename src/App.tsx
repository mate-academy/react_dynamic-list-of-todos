/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

function getPreparedTodo(todoList: Todo[], select: string, query: string) {
  const visibleTodos = [...todoList];

  switch (true) {
    case select === 'all': {
      if (query) {
        return visibleTodos.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      return visibleTodos;
    }

    case select === 'completed': {
      if (query) {
        return visibleTodos
          .filter(todo => todo.completed)
          .filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
      }

      return visibleTodos.filter(todo => todo.completed);
    }

    case select === 'active': {
      if (query) {
        return visibleTodos
          .filter(todo => !todo.completed)
          .filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
      }

      return visibleTodos.filter(todo => !todo.completed);
    }

    default:
      return visibleTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState('all');
  const [searchTodos, setSearchTodos] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return getPreparedTodo(todos, filterTodos, searchTodos);
  }, [filterTodos, searchTodos, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodos={filterTodos}
                setFilterTodos={setFilterTodos}
                searchTodos={searchTodos}
                setSearchTodos={setSearchTodos}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length && (
                <TodoList
                  todos={visibleTodos}
                  modalInfo={modalInfo}
                  setModalInfo={setModalInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalInfo && (
        <TodoModal modalInfo={modalInfo} setModalInfo={setModalInfo} />
      )}
    </>
  );
};
