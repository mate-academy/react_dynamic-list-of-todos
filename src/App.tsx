/* eslint-disable max-len */
import React, { useEffect, useState, useContext } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodosContext } from './services/Store';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const {
    todos,
    setTodos,
    selectedTodoId,
    displayTodoModal,
    loading,
    setLoading,
    titleFilter,
    filteredTodos,
  } = useContext(TodosContext);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    getTodos()
      .then((response) => setTodos(response))
      .finally(() => setLoading(false));

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then((response) => {
          setSelectedUser(response);
        });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, titleFilter, selectedTodo]);

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
              {loading && !displayTodoModal
                ? (
                  <Loader />
                )
                : (
                  <TodoList todos={filteredTodos} />
                )}
            </div>
          </div>
        </div>
      </div>

      {
        displayTodoModal && selectedTodo && (
          <TodoModal selectedTodo={selectedTodo} user={selectedUser} />
        )
      }
    </>
  );
};
