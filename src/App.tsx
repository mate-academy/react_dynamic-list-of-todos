/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SelectedTodo } from './types/CurrentTodo';
import { Select } from './types/Select';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      getTodos()
        .then((prev: Todo[]) => {
          setTodos(prev);
          setFilteredTodos(prev);
        })
        .finally(() => setIsLoading(false));
    }

    fetchData();
  }, []);

  const handleFilter = (value: Select) => {
    switch (value) {
      case Select.Active:
        setFilteredTodos(todos.filter((t: Todo) => !t.completed));
        break;
      case Select.Completed:
        setFilteredTodos(todos.filter((t: Todo) => t.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  };

  const handleInput = (event?: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setFilteredTodos(
        todos.filter((t: Todo) => t.title.includes(event.target.value)),
      );
    } else {
      setFilteredTodos(todos);
    }
  };

  const handleVisibleInfoOpen = () => {
    setInfoVisible(true);
  };

  const handleVisibleInfoClose = () => {
    setInfoVisible(false);
  };

  return (
    <SelectedTodo>
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter onSelect={handleFilter} onInput={handleInput} />
              </div>

              <div className="block">
                {isLoading && <Loader />}
                <TodoList
                  todos={filteredTodos}
                  onOpen={handleVisibleInfoOpen}
                />
              </div>
            </div>
          </div>
        </div>

        <TodoModal isVisible={infoVisible} onClose={handleVisibleInfoClose} />
      </>
    </SelectedTodo>
  );
};
