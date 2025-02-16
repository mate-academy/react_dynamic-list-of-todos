import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
        setFilteredTodos(todos);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const selectedTodo = useMemo(() => {
    return filteredTodos.find(todo => todo.id === selectedTodoId);
  }, [filteredTodos, selectedTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todosFromServer}
                handleFilterChange={setFilteredTodos}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  handleSelectTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSetSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
