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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos().then(todosFromServ => {
      setTodos(todosFromServ);
      setFilteredTodos(todosFromServ);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} onSetTodos={setFilteredTodos} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  onModalVisible={setIsModalVisible}
                  isModalVisible={isModalVisible}
                  todos={filteredTodos}
                  onTodoSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <TodoModal onModalVisible={setIsModalVisible} todo={selectedTodo} />
      )}
    </>
  );
};
