import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoaded(false);
    getTodos()
      .then(todosData => {
        if (todosData && todosData.length) {
          setTodos(todosData);
          setIsLoaded(true);
          setFiltredTodos(todosData);
        }
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
                setFiltredTodos={setFiltredTodos}
                todos={todos}
              />
            </div>

            <div className="block">
              {!isLoaded
                ? <Loader />
                : (
                  <TodoList
                    setIsActiveModal={setIsActiveModal}
                    selectTodo={todo}
                    setTodo={setTodo}
                    filtredTodos={filtredTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isActiveModal
        && (
          <TodoModal
            todo={todo}
            setIsActiveModal={setIsActiveModal}
            setTodo={setTodo}
          />
        )}
    </>
  );
};
