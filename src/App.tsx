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

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('all');
  const [selectTodo, setSelectTodo] = useState<Todo>();

  useEffect(() => {
    getTodos().then(response => setTodoList(response));
  }, []);

  const searchFilter = () => {
    return todoList.filter(todo => todo.title.includes(query));
  };

  const selectFilter = () => {
    const list = searchFilter();

    switch (sortBy) {
      case 'active':
        return list.filter(todo => !todo.completed);
      case 'completed':
        return list.filter(todo => todo.completed);
      default:
        return list;
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
                setQuery={setQuery}
                query={query}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            <div className="block">
              {todoList.length < 1
                ? <Loader />
                : <TodoList todoList={selectFilter} setSelectTodo={setSelectTodo} selectTodo={selectTodo} />}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal setSelectTodo={setSelectTodo} selectTodo={selectTodo} />
      )}
    </>
  );
};
