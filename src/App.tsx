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
import { Maybe } from './types/Maybe';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Maybe<Todo>>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((todosFromServer) => {
        setTodos(todosFromServer);
        setIsLoading(false);
      });
  }, []);

  const selectTodo = (todo: Todo) => {
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={todos} selectTodo={selectTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal onClose={setSelectedTodo} selectedTodo={selectedTodo} />}
    </>
  );
};
