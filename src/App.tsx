/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

import { getTodos } from './api'; // , getUser

export const App: React.FC = () => {
  const [todos, setTods] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  console.log('selectedTodo:', selectedTodo);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setTods(fetchedTodos);
        setIsLoaded(true);
      } catch (error) {
        // console.error(error);

        throw new Error(`We have a problem when we have loaded data - ${error}`);
      }
    };

    fetchTodos();
  }, []);

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
              {!isLoaded && <Loader />}

              {isLoaded && (
                <TodoList
                  todos={todos}
                  selectedTodoId={selectedTodo?.id}
                  onClick={handleTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {false && <TodoModal />}
    </>
  );
};
