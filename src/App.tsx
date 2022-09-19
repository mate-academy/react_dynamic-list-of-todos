/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [todo, setTodoId] = useState(0);

  const loadTodos = async () => {
    const uploadedTodos = await getTodos();

    setTodos(uploadedTodos);
    setLoader(true);
  };

  loadTodos();

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
              {!loader
                ? (<Loader />)
                : (
                  <TodoList
                    todos={todos}
                    selectedTodoId={todo}
                    selectTodo={(todoId) => setTodoId(todoId)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {todo !== 0
        && (
          <TodoModal
            todoId={todo}
            todos={todos}
            selectTodo={(todoId) => setTodoId(todoId)}
          />
        )}
    </>
  );
};
