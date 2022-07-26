/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [selectedTodo, selectTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isModalVisible, setModalVisbility] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(initialTodos);

  useEffect(() => {
    getTodos().then(allTodos => {
      setInitialTodos(allTodos);
      setVisibleTodos(allTodos);
    });

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(currentUser => setUser(currentUser));
    }
  }, [selectedTodo]);

  if (initialTodos.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={initialTodos}
                onSetVisibleTodos={setVisibleTodos}
              />
            </div>

            <div className="block">
              <TodoList
                todos={visibleTodos}
                onSelectTodo={selectTodo}
                onSetModalVisibility={setModalVisbility}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <TodoModal
          selectedTodo={selectedTodo}
          currentUser={user}
          onResetTodo={selectTodo}
          onResetUser={setUser}
          onResetModalVisibility={setModalVisbility}
        />
      )}
    </>
  );
};
