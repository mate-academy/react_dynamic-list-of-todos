import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { useTodos } from './utils/TodosContext';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';

export const App: React.FC = () => {
  const { todos, setTodos, selectedTodoId } = useTodos();

  useEffect(() => {
    getTodos().then(data => setTodos(data));
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {todos.length === 0 ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId && <TodoModal />}
    </>
  );
};
