/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const nonExistedTodo: Todo = {
  id: 0,
  title: 'none',
  completed: false,
  userId: 0,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(nonExistedTodo);

  useEffect(() => {
    getTodos().then((todosFromServer) => {
      setTodos(todosFromServer);
      setInitialTodos(todosFromServer);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                initialTodos={initialTodos}
                setTodos={setTodos}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={todos}
                    chosenTodo={chosenTodo}
                    setChosenTodo={setChosenTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {chosenTodo.id > 0 && (
        <TodoModal
          chosenTodo={chosenTodo}
          nonExistedTodo={nonExistedTodo}
          setChosenTodo={setChosenTodo}
        />
      )}
    </>
  );
};
