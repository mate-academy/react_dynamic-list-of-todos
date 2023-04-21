import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todosFromServer, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const uploadedTodos = await getTodos();

        setTodos(uploadedTodos);
        setFilteredTodos(uploadedTodos);
      } catch {
        setHasError(true);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchTodos();
  }, []);

  const handleTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const todoList = !hasError && (
    <TodoList
      todos={filteredTodos}
      onSelectTodo={handleTodo}
      onClosedTodo={selectedTodo}
    />
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onUploadedTodos={todosFromServer}
                onCurrentTodos={setFilteredTodos}
              />
            </div>

            <div className="block">
              {hasError && <span>Something went wrong. Please try later.</span>}

              {isLoaded
                ? todoList
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onResetTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
