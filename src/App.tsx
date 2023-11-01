/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SortType } from './types/SortType';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sortBy, setSortBy] = useState(SortType.All);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = getFilteredTodos(todos, inputValue, sortBy);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortBy={sortBy}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setSortBy={setSortBy}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    modalTodo={modalTodo}
                    setIsModalVisible={setIsModalVisible}
                    setModalTodo={setModalTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <TodoModal
          todo={modalTodo}
          setIsModalVisible={setIsModalVisible}
          setModalTodo={setModalTodo}
        />
      )}
    </>
  );
};
