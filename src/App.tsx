/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodoStatus } from './types/TodoStatus';
import { preparedTodos } from './utils/preparedTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const loadTodos = async () => {
    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
      setIsLoaded(true);
    } catch (error) {
      throw new Error(`There is an error with loading data: ${error}`);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = preparedTodos(todos, todoStatus, query);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  const handleCloseModal = () => {
    setSelectedTodoId(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onTodoStatus={setTodoStatus}
                query={query}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelectedTodoId={setSelectedTodoId}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={handleCloseModal} />
      )}
    </>
  );
};
