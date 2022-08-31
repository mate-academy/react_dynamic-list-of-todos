import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setIsLoading(true);
        setTodos(todosFromServer);
        setInitialTodos(todosFromServer);
      });
  }, []);

  const handleSelected = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {!isLoading
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
                        handleSelected(todo);
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
