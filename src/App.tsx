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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

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

  const handleFilterChange = (filter: Filter) => {
    if (filter === Filter.All) {
      setFilteredTodos(todos);
    } else if (filter === Filter.Completed) {
      setFilteredTodos(todos.filter(todo => todo.completed));
    } else {
      setFilteredTodos(todos.filter(todo => !todo.completed));
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
                todos={todos}
                setFilteredTodos={setFilteredTodos}
                handleFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={filteredTodos}
                handleModal={setIsModal}
                handleSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {isModal && selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} handleModal={setIsModal} />
      )}
    </>
  );
};
