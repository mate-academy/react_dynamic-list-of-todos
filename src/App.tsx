/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToShow, setTodosToShow] = useState(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modal, setModal] = useState(false);

  const showTodos = getTodos();

  useEffect(() => {
    showTodos.then((currentTodos) => {
      setTodos(currentTodos);
      setTodosToShow(currentTodos);
    });

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(user => setSelectedUser(user));
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                onSettingTodo={setTodosToShow}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={todosToShow}
                    setSelectedTodo={setSelectedTodo}
                    setModal={setModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          onSelectTodo={setSelectedTodo}
          setSelectedUser={setSelectedUser}
          setModal={setModal}
        />
      )}
    </>
  );
};
