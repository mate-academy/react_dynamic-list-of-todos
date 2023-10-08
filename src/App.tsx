/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { StatusFilterSelect } from './enums/enums';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const [filterByQuery, setFilterByQuery] = useState('');
  const [filterBySelect, setFilterBySelect] = useState('all');

  useEffect(() => {
    setLoading(true);
    getTodos().then(setTodos).finally(() => setLoading(false));
  }, []);

  const filterTodos = useMemo(() => {
    const filteredByTodos = todos.filter((todo) => {
      const { completed } = todo;

      switch (filterBySelect) {
        case StatusFilterSelect.ALL: return true;
        case StatusFilterSelect.ACTIVE: return !completed;
        case StatusFilterSelect.COMPLETED: return completed;
        default: return true;
      }
    });

    const filteredByQueryTodos = filterByQuery
      ? filteredByTodos.filter((todo) => todo.title
        .toLowerCase().includes(filterByQuery.toLowerCase())) : filteredByTodos;

    return filteredByQueryTodos;
  }, [filterByQuery, filterBySelect, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByQuery={filterByQuery}
                setFilterByQuery={setFilterByQuery}
                filterBySelect={filterBySelect}
                setFilterBySelect={setFilterBySelect}
              />
            </div>

            <div className="block">
              {
                loading && (
                  <Loader />
                )
              }

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filterTodos}
                  selTodo={setSelectedTodo}
                  modal={openModal}
                  onModal={setOpenModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <TodoModal
          todo={selectedTodo}
          onModal={setOpenModal}
        />
      )}
    </>
  );
};
