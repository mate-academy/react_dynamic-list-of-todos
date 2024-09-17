import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(todos1 => {
      setTodos(todos1);
      setFilteredTodos(todos1);
      setLoading(false);
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleFilter = (filteredTodos: Todo[]) => {
    setFilteredTodos(filteredTodos);
  };

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setModal(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} onFilter={handleFilter} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  openModal={openModal}
                  selectedTodo={selectedTodo} // Pass selectedTodo
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modal && selectedTodo ? (
        <TodoModal modal={modal} todo={selectedTodo} closeModal={closeModal} />
      ) : null}
    </>
  );
};
