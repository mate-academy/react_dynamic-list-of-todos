import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [todoId, setTodoId] = useState<number | null>(null);
  const [status, setStatus] = useState('All');

  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const loadTodos = async () => {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    };

    loadTodos()
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={status}
                selectStatus={setStatus}
                selectQuery={setQuery}
                selectedQuery={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    selectedQuery={query}
                    selectedStatus={status}
                    todos={todos}
                    selectedTodoId={todoId}
                    selectTodo={setTodoId}
                  />
                )}

            </div>
          </div>
        </div>
      </div>
      {!!todoId && (
        <TodoModal
          selectedTodoId={todoId}
          todos={todos}
          selectTodo={setTodoId}
        />
      )}
    </>
  );
};
