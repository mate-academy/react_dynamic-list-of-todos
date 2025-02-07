/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Filters } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selTodo, setSelTodo] = useState<Todo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [todosLoaded, setTodosLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filters>(Filters.all);

  useEffect(() => {
    getTodos()
      .then(res => {
        setTodos(res);
        setTodosLoaded(true);
      })
      .catch(() => {
        setTodosLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (selTodo) {
      setShowModal(true);
    }
  }, [selTodo]);

  useEffect(() => {
    getTodos()
      .then(res => {
        let tempTodos = [...res];

        switch (filter) {
          case Filters.active:
            tempTodos = tempTodos.filter(todo => !todo.completed);
            break;
          case Filters.completed:
            tempTodos = tempTodos.filter(todo => todo.completed);
            break;

          case Filters.all:
          default:
            break;
        }

        tempTodos = tempTodos.filter(todo =>
          todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
        );

        setTodos(tempTodos);
        setTodosLoaded(true);
      })
      .catch(() => {
        setTodos([]);
        setTodosLoaded(true);
      });
  }, [query, filter]);

  const handleModalClose = () => {
    setSelTodo(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelect={setFilter} onQuery={setQuery} />
            </div>

            <div className="block">
              {!todosLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedId={selTodo ? selTodo.id : null}
                  onViewTodo={setSelTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && <TodoModal todo={selTodo} onClose={handleModalClose} />}
    </>
  );
};
