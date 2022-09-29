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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodoId, setSelectTodoId] = useState<number>(0);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('All');

  // const filterTodos = (todosFromServer: Todo[]) => {
  //   const filteredTodos = todosFromServer.filter(todo => todo.title.includes(query));

  //   return filteredTodos;
  // };

  useEffect(() => {
    getTodos()
      .then(result => setTodos(result));
  }, []);

  const viewModule = (id: number) => {
    setSelectTodoId(id);
  };

  const onSetQuery = (value: string) => setQuery(value);

  const selectTodo = () => todos.find(todo => todo.id === selectTodoId);

  const onSetFilterBy = (value: string) => {
    setFilterBy(value);
  };

  const filterTodos = todos
    .filter(({ completed }) => {
      switch (filterBy) {
        case 'active':
          return !completed;

        case 'completed':
          return completed;

        default:
          return true;
      }
    })
    .filter(({ title }) => (
      title.toLowerCase()
        .includes(query.toLowerCase())
    ));

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
                : <TodoList todos={filterTodos} viewModule={viewModule} />}
            </div>
          </div>
        </div>
      </div>
      {selectTodoId && (<TodoModal selectTodo={selectTodo} viewModule={viewModule} />)}
    </>
  );
};
