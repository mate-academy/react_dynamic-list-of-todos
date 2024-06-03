/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useTodoFilter } from './components/TodoFilter/useTodoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodoLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const {
    filter,
    search,
    filteredTodos,
    handleFilterChange,
    handleSearchChange,
  } = useTodoFilter(todos);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosData = await getTodos();

      setTodos(todosData);
      setIsTodoLoading(false);
    };

    fetchTodos();
  }, []);

  const handleShowModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalVisible(todo.id);
  };

  const handleHideModal = () => {
    setModalVisible(null);
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
                filter={filter}
                search={search}
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  modalVisible={modalVisible}
                  handleShowModal={handleShowModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalVisible && selectedTodo && (
        <TodoModal todo={selectedTodo} handleHideModal={handleHideModal} />
      )}
    </>
  );
};
