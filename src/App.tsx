/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo []>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo []>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [selectedUser, setSelectedUserId] = useState<number>(0);

  useEffect(() => {
    getTodos().then(allTodos => {
      setTodos(allTodos);
    });
  }, []);

  const handleOnChoose = (userId : number, todoId: number) => {
    setSelectedUserId(userId);
    setSelectedTodoId(todoId);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilteredTodos={setFilteredTodos} todos={todos} />
            </div>

            <div className="block">
              {
                todos.length === 0
                  ? <Loader />
                  : (
                    <TodoList
                      todos={filteredTodos}
                      handleOnChoose={handleOnChoose}
                      selectedTodoId={selectedTodoId}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todoId={selectedTodoId}
          userId={selectedUser}
          handleOnChoose={handleOnChoose}
          todos={todos}
        />
      )}
    </>
  );
};
