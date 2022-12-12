/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
// import { User } from './types/User';
import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  // const [allUsers, setAllUsers] = useState<User | {}>({});
  const [status, setStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [selectedTodo, setSelectedTodo] = useState<Todo | {}>({});

  const onStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const onOpenModal = () => {
    setShowModal(prevState => !prevState);
  };

  const filteringStatus = (stat: string) => {
    switch (stat) {
      case 'completed': {
        return allTodos.filter(todo => todo.completed === true);
      }

      case 'active': {
        return allTodos.filter(todo => todo.completed === false);
      }

      default: {
        return allTodos;
      }
    }
  };

  const filteredTodoByStatus = filteringStatus(status);

  function getTodosFromServer() {
    getTodos()
      .then(resultTodos => setAllTodos(resultTodos));
  }

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={onStatusChange}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList allTodos={filteredTodoByStatus} onOpenModal={onOpenModal} />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal showModal={showModal} onOpenModal={onOpenModal} />
      )}
    </>
  );
};
