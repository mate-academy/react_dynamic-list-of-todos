/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
// import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTodos = async () => {
    setLoading(true);

    try {
      const response = await getTodos();

      setTodos(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {/* <TodoFilter /> */}
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todos}
                selectedTodoId={selectedTodoId}
                setSelectedTodoId={setSelectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
