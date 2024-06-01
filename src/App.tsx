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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodoLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosData = await getTodos();

      setTodos(todosData);
      setIsTodoLoading(false);
    };

    fetchTodos();
  }, []);

  const handleShowModal = (visible: boolean) => {
    setModalVisible(visible);
  };

  const handleHideModal = (visible: boolean) => {
    setModalVisible(visible);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList todos={todos} handleShowModal={handleShowModal} />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalVisible && <TodoModal handleHideModal={handleHideModal} />}
    </>
  );
};
