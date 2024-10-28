/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSearch, setCurrentSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [openedTodo, setOpenedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosList => setTodos(todosList))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [currentFilter, todos]);

  const searchedTodos = useMemo(() => {
    if (!currentSearch) {
      return filteredTodos;
    }

    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(currentSearch.toLowerCase()),
    );
  }, [currentSearch, filteredTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">

              <TodoFilter
                setFilter={setCurrentFilter}
                setSearch={setCurrentSearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              <TodoList
                todos={searchedTodos}
                setShowModal={setShowModal}
                setOpenedTodo={setOpenedTodo}
                openedTodo={openedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {loading && <Loader />}

      {showModal && (
        <TodoModal
          setShowModal={setShowModal}
          setOpenedTodo={setOpenedTodo}
          openedTodo={openedTodo}
        />
      )}
    </>
  );
};
