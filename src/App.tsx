/* eslint-disable max-len */
import React, { useCallback, useContext, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getUser } from './api';
import { TodosContext } from './components/TodosProvider';

export const App: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const { todos, loadTodosError } = useContext(TodosContext);

  const getDataToModal = useCallback(async (userId: number, selectedTodo: Todo) => {
    try {
      setIsModalLoading(true);
      const selectedUser = await getUser(userId);

      setCurrentTodo(selectedTodo);
      setUserData(selectedUser);
    } catch (error) {
      setUserData(null);
      setCurrentTodo(selectedTodo);
    }
  }, []);

  const loadModal = (isLoading: boolean) => {
    setIsModalLoading(isLoading);
    if (!isLoading) {
      setCurrentTodo(null);
      setUserData(null);
    }
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

            {!loadTodosError && (
              <div className="block">
                {todos.length === 0
                  ? <Loader />
                  : (
                    <TodoList
                      getDataToModal={getDataToModal}
                      isModalLoading={isModalLoading}
                      selectedTodoId={currentTodo?.id || null}
                    />
                  )}
              </div>
            )}
            {loadTodosError && (
              <div>Todos not found</div>
            )}
          </div>
        </div>
      </div>

      {isModalLoading && (
        <TodoModal
          userData={userData}
          currentTodo={currentTodo}
          loadModal={loadModal}
        />
      )}
    </>
  );
};
