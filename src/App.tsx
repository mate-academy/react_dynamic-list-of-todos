/* eslint-disable max-len */
import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUser } from './api';
import { TodosContext } from './components/TodosProvider';

export const App: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const { todos, loadTodosError } = useContext(TodosContext);

  const setModalInfoData = (user: User | null, todoId: number) => {
    setCurrentTodoId(todoId);
    setUserData(user);
  };

  const getDataToModal = useCallback(async (userId: number, selectedTodoId: number) => {
    try {
      setIsModalLoading(true);
      const selectedUser = await getUser(userId);

      setModalInfoData(selectedUser, selectedTodoId);
    } catch {
      setModalInfoData(null, selectedTodoId);
    }
  }, []);

  const loadModal = useCallback((isLoading: boolean) => {
    setIsModalLoading(isLoading);
    if (!isLoading) {
      setCurrentTodoId(null);
      setUserData(null);
    }
  }, []);

  const currentTodoData = useMemo(() => {
    return todos.find(todo => todo.id === currentTodoId) || null;
  }, [currentTodoId, todos]);

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
                      selectedTodoId={currentTodoId || null}
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
          currentTodoData={currentTodoData}
          loadModal={loadModal}
        />
      )}
    </>
  );
};
