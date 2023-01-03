/* eslint-disable max-len */
import React, {
  ChangeEvent, useEffect, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);

  const [searchInput, setSearchInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [selectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const getVisibleTodos = () => {
    return todos.filter(prevTodo => {
      const isTitleContainInput = prevTodo.title.toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase());

      if (selectedStatus === 'active' && isTitleContainInput) {
        return !prevTodo.completed;
      }

      if (selectedStatus === 'completed' && isTitleContainInput) {
        return prevTodo.completed;
      }

      return isTitleContainInput;
    });
  };

  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchInput(value);
  };

  const onStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedStatus(value);
  };

  const handleRemoveSearchInput = () => setSearchInput('');

  const handleSelectButtonClick = (id: number) => setSelectedButton(id);

  const handleCloseModal = () => setSelectedButton(0);

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
              {
                todos.length === 0
                && <Loader />
              }
              <TodoList
                visibleTodos={getVisibleTodos()}
                handleSelectButtonClick={handleSelectButtonClick}
                selectedButton={selectedButton}
              />
            </div>
          </div>
        </div>
      </div>

      {
        selectedButton > 0
        && (
          <TodoModal
            recentTodo={todos[selectedButton - 1]}
            handleCloseModal={handleCloseModal}
            selectedButton={selectedButton}
          />
        )
      }
    </>
  );
};
