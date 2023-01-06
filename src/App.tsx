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
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [showModalBoolean, setShowModalBoolean] = useState(false);
  const [todo, setTodo] = useState({
    title: '',
    id: 0,
    completed: false,
    userId: 0,
  });

  useEffect(() => {
    const getTodosFromServer = async () => {
      setLoading(true);
      const result = await getTodos();

      setTodos(result);
      setVisibleTodos(result);
      setLoading(false);
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
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                setTodo={setTodo}
                setShowModalBoolean={setShowModalBoolean}
              />
            </div>
          </div>
        </div>
      </div>

      {showModalBoolean
        && (
          <TodoModal
            todo={todo}
            setShowModalBoolean={setShowModalBoolean}
            loadingModal={loadingModal}
            setLoadingModal={setLoadingModal}
          />
        )}
    </>
  );
};
