/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
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
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  const fetchTodos = async () => {
    await getTodos().then((todosFromServer) => {
      setTodos(todosFromServer);
      setFilteredTodos(todosFromServer);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onSelectTodo = useCallback(
    (todoId: number) => {
      setSelectedTodoId(todoId);
    },
    [selectedTodoId],
  );

  const onFilter = (todosToFilter: Todo[]) => {
    setFilteredTodos(todosToFilter);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={onFilter}
                todos={todos}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    onSelectTodo={onSelectTodo}
                    selectedId={selectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          loadingState={isLoading}
          selectedTodo={selectedTodo}
          onClose={onSelectTodo}
        />
      )}
    </>
  );
};
