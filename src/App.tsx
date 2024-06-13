import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [shownTodos, setShownTodos] = useState<number[]>([]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    return matchesStatus && matchesSearch;
  });

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
    setShownTodos(prevShownTodos =>
      prevShownTodos.includes(todo.id)
        ? prevShownTodos.filter(id => id !== todo.id)
        : [...prevShownTodos, todo.id],
    );
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTodo(null);
    if (selectedTodo) {
      setShownTodos(prevShownTodos =>
        prevShownTodos.filter(id => id !== selectedTodo.id),
      );
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={handleShowTodo}
                  shownTodos={shownTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        modalOpen={modalOpen}
        selectedTodo={selectedTodo}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
