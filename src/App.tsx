/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export enum Select {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [shownTodos, setShownTodos] = useState<Todo[] | null>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const [singleTodo, setSingleTodo] = useState<Todo | null>(null);

  const [selectedValue, setSelectedValue] = useState<Select>(Select.ALL);
  const [searchQueryTitle, setSearchQueryTitle] = useState<string>('');

  useEffect(() => {
    setIsLoader(true);
    getTodos()
      .then(data => setTodos(data))
      // eslint-disable-next-line no-console
      .catch(error => console.error(`Something went wrong: ${error}`))
      .finally(() => setIsLoader(false));
  }, []);

  useEffect(() => {
    const filterTodos = todos.filter(todo => {
      const filterQueryTitle = todo.title
        .toLowerCase()
        .includes(searchQueryTitle.toLowerCase());

      if (selectedValue === Select.ALL) {
        return filterQueryTitle;
      }

      if (selectedValue === Select.COMPLETED) {
        return filterQueryTitle && todo.completed;
      }

      if (selectedValue === Select.ACTIVE) {
        return filterQueryTitle && !todo.completed;
      }

      return false;
    });

    setShownTodos(filterTodos);
  }, [searchQueryTitle, selectedValue, todos]);

  const selectTodoOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (Object.values(Select).includes(value as Select)) {
      setSelectedValue(value as Select);
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
                selectTodoOption={selectTodoOption}
                selectedValue={selectedValue}
                setSearchQueryTitle={setSearchQueryTitle}
                searchQueryTitle={searchQueryTitle}
              />
            </div>

            <div className="block">
              {isLoader && <Loader />}
              <TodoList
                shownTodos={shownTodos}
                setSingleTodo={setSingleTodo}
                singleTodo={singleTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {singleTodo && (
        <TodoModal singleTodo={singleTodo} setSingleTodo={setSingleTodo} />
      )}
    </>
  );
};
