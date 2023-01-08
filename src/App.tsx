import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [showModalBoolean, setShowModalBoolean] = useState(false);

  const [defaultTodo, setDefaultTodo] = useState({
    title: '',
    id: 0,
    completed: false,
    userId: 0,
  });

  useEffect(() => {
    const getTodosFromServer = async () => {
      setIsLoading(true);
      const result = await getTodos();

      setTodos(result);
      setVisibleTodos(result);
      setIsLoading(false);
    };

    getTodosFromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setVisibleTodos={setVisibleTodos}
                visibleTodos={visibleTodos}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                setTodo={setDefaultTodo}
                setShowModalBoolean={setShowModalBoolean}
              />
            </div>
          </div>
        </div>
      </div>

      {showModalBoolean && (
        <TodoModal
          todo={defaultTodo}
          setShowModalBoolean={setShowModalBoolean}
          loadingModal={isLoadingModal}
          setLoadingModal={setIsLoadingModal}
        />
      )}
    </>
  );
};
