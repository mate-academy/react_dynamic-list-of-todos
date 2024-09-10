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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [currentStatus, setCurrentStatus] = useState('all');
  const [inputValue, setInputValue] = useState('');

  const handleChangeCurrentStatus = (newCurrentStatus: string) =>
    setCurrentStatus(newCurrentStatus);

  const handleSetIsOpen = (value: boolean) => setIsOpen(value);

  const handleSetCurrentTodo = (newTodo: Todo | null) =>
    setCurrentTodo(newTodo);

  const handleChangeInut = (newInputValue: string) =>
    setInputValue(newInputValue);

  const filteredTodos = (newStatus: string, qvery: string): Todo[] => {
    return todos
      .filter(todo => {
        switch (newStatus) {
          case 'all':
            return true;

          case 'active':
            return !todo.completed;

          case 'completed':
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
                changeInput={handleChangeInut}
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
