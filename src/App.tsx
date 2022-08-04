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
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosData => {
        setTodos(todosData);
      })
      .finally(() => {
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
                    todos={todos}
                    onSetVisibleTodos={setVisibleTodos}
                  />
                </div>

                <div className="block">
                  <TodoList
                    todos={visibleTodos}
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
