/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosfromServer => {
        setInitialTodos(todosfromServer);
        setTodos(todosfromServer);
        setIsLoaded(true);
      });
  }, []);

  const handleSelectedTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {!isLoaded
              ? <Loader />
              : (
                <>
                  <div className="block">
                    <TodoFilter
                      todos={initialTodos}
                      onFilterTodo={setTodos}
                    />
                  </div>

                  <div className="block">
                    <TodoList
                      todos={todos}
                      selectedTodo={selectedTodo}
                      onTodoSelect={(todo) => {
                        handleSelectedTodo(todo);
                      }}
                    />
                  </div>
                </>
              )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => {
            setSelectedTodo(null);
          }}
        />
      )}
    </>
  );
};
