/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [input, setInput] = useState('');
  const [isDedicatedUser, setIsDedicatedUser] = useState(1);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const thisTodo = todos.find(todo => todo.id === isDedicatedUser) as Todo;

  useEffect(() => {
    setIsLoading(true);
    getTodos().then((data) => (
      setTodos(data)
    )).finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter input={input} setInput={setInput} setFilterType={setFilterType} />
            </div>

            <div className="block">
              {isLoading ? <Loader />
                : <TodoList input={input} todos={todos} filterType={filterType} setIsDedicatedUser={setIsDedicatedUser} setShow={setShow} />}
            </div>
          </div>
        </div>
      </div>

      {show && <TodoModal thisTodo={thisTodo} setShow={setShow} />}
    </>
  );
};
