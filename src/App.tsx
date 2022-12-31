/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | []>([]);

  const [searchInput, setSearchInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    getTodos().then(result => {
      setTodos(result);
      setVisibleTodos(result);
    });
  }, []);

  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => (
    setSearchInput(event.target.value)
  );

  const handleRemoveSearchInput = () => setSearchInput('');

  const onStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedStatus(value);

    switch (value) {
      case 'active':
        setVisibleTodos(todos.filter(prevTodo => !prevTodo.completed));
        break;
      case 'completed':
        setVisibleTodos(todos.filter(prevTodo => prevTodo.completed));
        break;
      default:
        setVisibleTodos(todos);
        break;
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInput={searchInput}
                selectedStatus={selectedStatus}
                handleChangeSearchInput={handleChangeSearchInput}
                handleRemoveSearchInput={handleRemoveSearchInput}
                onStatusChange={onStatusChange}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList visibleTodos={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
