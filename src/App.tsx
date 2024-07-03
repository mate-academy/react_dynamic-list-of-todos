/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filter, setFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setIsLoading(false);
    });
  }, []);

  const filteredTodos = useMemo(() => {
    let result = todos;

    switch (filter) {
      case 'active':
        result = result.filter(todo => !todo.completed);
        break;
      case 'completed':
        result = result.filter(todo => todo.completed);
        break;
      case 'all':
      default:
        break;
    }

    if (searchInput) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }

    return result;
  }, [filter, searchInput, todos]);

  const handleModalOpen = (todo: Todo) => {
    setIsModalOpen(true);
    setModalTodo(todo);
    setSelectedTodoId(todo.id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalTodo(null);
    setSelectedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setSearchInput={setSearchInput}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  openModal={handleModalOpen}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && modalTodo && (
        <TodoModal todo={modalTodo} closeModal={handleModalClose} />
      )}
    </>
  );
};
