/* eslint-disable max-len */
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const uploadedTodos = await getTodos();

      setFilteredTodos(uploadedTodos);
      setTodos(uploadedTodos);
      setIsLoaded(true);
    };

    fetchTodos();
  }, []);

  const handleTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onUploadedTodos={todos}
                onCurrentTodos={setFilteredTodos}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={filteredTodos}
                    onSelectTodo={handleTodo}
                    onClosedTodo={selectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            onResetTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
