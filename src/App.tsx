/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isTodoActive, setIsTodoActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(todos[0]);

  useEffect(() => {
    const fetchTodos = async () => {
      const currentTodos = await getTodos();

      setTodos(currentTodos);
      setIsLoaded(true);
    };

    fetchTodos();
  }, []);

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  const handleTodo = (todo: Todo) => {
    setSelectedTodo(todo);
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
              {isLoaded
                ? (
                  <TodoList
                    todos={todos}
                    onSelectUser={handleSelectUser}
                    onSelectTodo={handleTodo}
                    onUserActive={setIsTodoActive}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isTodoActive
        && (
          <TodoModal
            userId={selectedUserId}
            todo={selectedTodo}
            onResetTodo={setIsTodoActive}
          />
        )}
    </>
  );
};
