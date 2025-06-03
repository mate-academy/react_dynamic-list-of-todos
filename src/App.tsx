/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todoFilter, setTodoFilter] = useState('');
  const [isTodoModal, setIsTodoModal] = useState(false);
  const [chosenTodo, setChosenTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetch('api/todos.json')
      .then(response => response.json())
      .then((todosFromServer: Todo[]) => {
        if (todoFilter === 'active') {
          setTodos(todosFromServer.filter(todo => !todo.completed));
        }

        if (todoFilter === 'completed') {
          setTodos(todosFromServer.filter(todo => todo.completed));
        }

        if (todoFilter === '') {
          setTodos(todosFromServer);
        }
      })
      .finally(() => setTimeout(() => setIsLoading(false), 200));
  }, [todoFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setTodoFilter={setTodoFilter} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todos}
                isTodoModal={isTodoModal}
                isLoading={isLoading}
                setIsTodoModal={setIsTodoModal}
                chosenTodo={chosenTodo}
                setChosenTodo={setChosenTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {isTodoModal && (
        <TodoModal todo={chosenTodo} setIsTodoModal={setIsTodoModal} />
      )}
    </>
  );
};
