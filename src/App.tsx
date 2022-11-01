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
import { SortTypes } from './types/SortTypes';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState(SortTypes.All);
  const [selectTodo, setSelectTodo] = useState<Todo>();

  useEffect(() => {
    getTodos().then(response => setTodoList(response));
  }, []);

  const searchFilter = () => {
    return todoList.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  };

  const selectFilter = () => {
    const list = searchFilter();

    switch (sortBy) {
      case SortTypes.Active:
        return list.filter(todo => !todo.completed);
      case SortTypes.Completed:
        return list.filter(todo => todo.completed);
      default:
        return list;
    }
  };

  const handleQuery = (value: string) => {
    setQuery(value);
  };

  const handleSortType = (event:any) => {
    setSortBy(event.target.value);
  };

  const handleSelectTodo = (value: Todo | undefined) => {
    setSelectTodo(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleQuery={handleQuery}
                query={query}
                sortBy={sortBy}
                handleSortType={handleSortType}
              />
            </div>

            <div className="block">
              {todoList.length < 1
                ? <Loader />
                : (
                  <TodoList
                    todoList={selectFilter}
                    handleSelectTodo={handleSelectTodo}
                    selectTodo={selectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal setSelectTodo={handleSelectTodo} selectTodo={selectTodo} />
      )}
    </>
  );
};
