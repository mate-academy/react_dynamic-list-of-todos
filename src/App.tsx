import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { useTodos } from './utils/TodosContext';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const { query, todos, setTodos, filter, selectedTodo } = useTodos();

  useEffect(() => {
    getTodos().then(setTodos);
  });

  let visibleTodos = filterTodos([...todos], filter);

  if (query) {
    visibleTodos = visibleTodos.filter(item =>
      item.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

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
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal />}
    </>
  );
};
