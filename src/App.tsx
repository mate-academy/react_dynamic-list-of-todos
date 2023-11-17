/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export enum Status {
  All,
  Active,
  Completed
}

export type FilterQuery = {
  pattern: string,
  status: Status,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterQuery, setFilterQuery] = useState<FilterQuery>({ pattern: '', status: Status.All });
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>();

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const filteredTodos = useMemo(() => {
    let todosCopy = [...todos];

    if (filterQuery.pattern.trim()) {
      todosCopy = todosCopy
        .filter(todo => todo.title.toLocaleLowerCase().includes(filterQuery.pattern.toLocaleLowerCase()));
    }

    switch (filterQuery.status) {
      case Status.Active:
        todosCopy = todosCopy.filter(todo => !todo.completed);
        break;
      case Status.Completed:
        todosCopy = todosCopy.filter(todo => todo.completed);
        break;
      case Status.All:
      default:
        break;
    }

    return todosCopy;
  }, [todos, filterQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setQuery={setFilterQuery} />
            </div>

            <div className="block">
              {!todos.length && (<Loader />)}
              {filteredTodos?.length && (
                <TodoList
                  todos={filteredTodos}
                  setSelected={setSelectedTodo}
                  selected={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo &&
      (<TodoModal
        selected={selectedTodo}
        setSelected={setSelectedTodo}
      />)}
    </>
  );
};
