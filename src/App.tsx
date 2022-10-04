/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectTodoId, setSelectTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy | string>(FilterBy.All);

  const uploadTodo = async () => {
    try {
      const todosFromServer = getTodos();

      setTodos(await todosFromServer);
      setVisibleTodos(await todosFromServer);
    } catch {
      throw new Error('Todos not fond');
    }
  };

  useEffect(() => {
    uploadTodo();
  }, []);

  const viewModule = (id: number) => {
    setSelectTodoId(id);
  };

  const onSetQuery = (value: string) => setQuery(value);

  const selectTodo = () => todos.find(todo => todo.id === selectTodoId);

  const onSetFilterBy = (value: FilterBy | string) => {
    setFilterBy(value);
  };

  useEffect(() => {
    const filteredTodos = todos
      .filter(({ completed, title }) => {
        switch (filterBy) {
          case FilterBy.Active:
            return !completed && title.toLowerCase()
              .includes(query.toLowerCase());

          case FilterBy.Completed:
            return completed && title.toLowerCase()
              .includes(query.toLowerCase());

          default:
            return title.toLowerCase()
              .includes(query.toLowerCase());
        }
      });

    setVisibleTodos(filteredTodos);
  }, [query, filterBy]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={onSetQuery}
                filterBy={filterBy}
                setFilterBy={onSetFilterBy}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : <TodoList todos={visibleTodos} viewModule={viewModule} />}
            </div>
          </div>
        </div>
      </div>
      {selectTodoId && (<TodoModal selectTodo={selectTodo} viewModule={viewModule} />)}
    </>
  );
};
