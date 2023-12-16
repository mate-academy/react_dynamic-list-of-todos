/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './services/getTodos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [preparedTodos, setPreparedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setPreparedTodos(todosFromServer);
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
                todos={todos}
                setPreparedTodos={setPreparedTodos}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? (<Loader />)
                : (
                  <TodoList
                    todos={preparedTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
