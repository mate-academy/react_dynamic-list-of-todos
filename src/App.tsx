/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setTodos={setTodos} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  setModalVisible={setIsModalVisible}
                  setSelectedTodo={setTodo}
                  todos={todos}
                  selectedTodo={todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <TodoModal
          setVisible={setIsModalVisible}
          todo={todo}
          setTodo={setTodo}
        />
      )}
    </>
  );
};
