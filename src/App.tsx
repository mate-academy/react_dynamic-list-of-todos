/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [currentStatus, setCurrentStatus] = useState(Status.all);
  const [inputValue, setInputValue] = useState('');

  const handleChangeCurrentStatus = (newCurrentStatus: Status) =>
    setCurrentStatus(newCurrentStatus);

  const handleSetIsOpen = (value: boolean) => setIsOpen(value);

  const handleSetCurrentTodo = (newTodo: Todo | null) =>
    setCurrentTodo(newTodo);

  const handleChangeInput = (newInputValue: string) =>
    setInputValue(newInputValue);

  const filteredTodos = (newStatus: string, qvery: string): Todo[] => {
    return todos
      .filter(todo => {
        switch (newStatus) {
          case Status.all:
            return true;

          case Status.active:
            return !todo.completed;

          case Status.completed:
            return todo.completed;

          default:
            return false;
        }
      })
      .filter(todo =>
        todo.title.toLocaleLowerCase().includes(qvery.toLocaleLowerCase()),
      );
  };

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                currentStatus={currentStatus}
                inputValue={inputValue}
                handleChangeStatus={handleChangeCurrentStatus}
                changeInput={handleChangeInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={filteredTodos(currentStatus, inputValue)}
                  isOpen={isOpen}
                  changeOpen={handleSetIsOpen}
                  changeCurrentTodo={handleSetCurrentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpen && currentTodo && (
        <TodoModal changeOpen={handleSetIsOpen} currentTodo={currentTodo} />
      )}
    </>
  );
};
