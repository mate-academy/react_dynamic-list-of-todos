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
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosData => {
        setInitialTodos(todosData);
        setTodos(todosData);
      })
      .then(() => {
        setIsLoaded(true);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {!isLoaded ? (
              <Loader />
            ) : (
              <>
                <div className="block">
                  <TodoFilter
                    todos={initialTodos}
                    onSetTodos={setTodos}
                  />
                </div>

                <div className="block">
                  <TodoList
                    todos={todos}
                    selectedTodo={selectedTodo}
                    onTodoSelected={setSelectedTodo}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseTodoModal={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
