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
  const [inputValue, setInputValue] = useState('');
  const [isTodoModal, setIsTodoModal] = useState(false);
  const [chosenTodo, setChosenTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetch('api/todos.json')
      .then(res => res.json())
      .then(todosFromServer => {
        let filteredTodos = todosFromServer;

        if (todoFilter === 'active') {
          filteredTodos = filteredTodos.filter((todo: Todo) => !todo.completed);
        } else if (todoFilter === 'completed') {
          filteredTodos = filteredTodos.filter((todo: Todo) => todo.completed);
        }

        if (inputValue !== '') {
          const value = inputValue.toLowerCase();

          filteredTodos = filteredTodos.filter((todo: Todo) =>
            todo.title.toLowerCase().includes(value),
          );
        }

        setTodos(filteredTodos);
      })
      .finally(() => setTimeout(() => setIsLoading(false), 200));
  }, [todoFilter, inputValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setTodoFilter={setTodoFilter}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
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
