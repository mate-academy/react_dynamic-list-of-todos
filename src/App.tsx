/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setFilteredTodos(fetchedTodos);
      })
      .finally(() => {
        setIsLoading(false);
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
                todos={todos}
                currentFilter={currentFilter}
                setFilteredTodos={setFilteredTodos}
                handleFilterChange={setCurrentFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={filteredTodos}
                modalState={isModal}
                selectedTodo={selectedTodo}
                handleModal={setIsModal}
                handleSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {isModal && selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleModal={setIsModal}
          handleSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
