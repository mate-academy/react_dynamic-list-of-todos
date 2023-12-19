import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [chosenTodo, setChosenTodo] = useState<Todo | null>(null);
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  useEffect(() => {
    /* eslint-disable max-len */
    fetch('https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json')
      .then((response) => {
        if (!response) {
          throw new Error('No network response');
        }

        return response.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error('No data');
        }

        setTodos(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setFilter={setFilteredTodos}
              />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : null}
              <TodoList
                filteredTodos={filteredTodos}
                setChosenTodo={setChosenTodo}
                handleToggleModal={handleToggleModal}
                chosenTodo={chosenTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {chosenTodo && (
        <TodoModal
          chosenTodo={chosenTodo}
          toggleModal={toggleModal}
          setChosenTodo={setChosenTodo}
          setToggleModal={setToggleModal}
        />
      )}
    </>
  );
};
