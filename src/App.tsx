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
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [todoId, setTodoId] = useState(0);

  const loadTodos = async () => {
    setIsTodosLoading(true);

    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsTodosLoading(false);
    } catch (error) {
      setIsTodosLoading(false);
      throw new Error(`something went wrong ${error}`);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleTodoId = (id: number) => {
    setTodoId(id);
  };

  const currentTodo = todos.find(todo => todo.id === todoId) || null;

  const closeModal = () => setTodoId(0);

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
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodoId={todoId}
                  selectTodo={handleTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} closeModal={closeModal} />}
    </>
  );
};
