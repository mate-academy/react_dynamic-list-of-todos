/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredByReady, setFiltredByReady] = useState(todos);
  const [hasLoading, setHasIsLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  const fetchTodos = async () => {
    await getTodos().then((todosFromServer) => {
      setTodos(todosFromServer);
      setFiltredByReady(todosFromServer);
    });
    setHasIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const selectTodo = useCallback(
    (todoId: number) => {
      setSelectedTodoId(todoId);
    },
    [selectedTodoId],
  );

  const onFilter = (todosToFilter: Todo[]) => {
    setFiltredByReady(todosToFilter);
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
              {hasLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filtredByReady}
                    selectTodo={selectTodo}
                    selectedId={selectedTodoId}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          loadingState={hasLoading}
          selectedTodo={selectedTodo}
          onClose={selectTodo}
        />
      )}
    </>
  );
};
