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
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectTodo, setSelectTodo] = useState<Todo | undefined>(undefined);
  const [filterByCompleted, setFilterByCompleted] = useState<string>(Filter.ALL);
  const [filterByTitle, setFilterByTitle] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((todosFromServer) => {
        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
      })
      .finally(() => setLoading(false));
  }, []);

  const handlerFilterChange = (newFilter: string) => {
    setFilterByCompleted(newFilter);
  };

  const handlerFilterByTitleChange = (newFilter: string) => {
    setFilterByTitle(newFilter);
  };

  useEffect(() => {
    setVisibleTodos(
      todos.filter((todo) => {
        switch (filterByCompleted) {
          case Filter.ALL:
            return true;
            break;

          case Filter.ACTIVE:
            return !todo.completed;
            break;

          default:
            return todo.completed;
        }
      }).filter((todo) => {
        return todo.title.toLowerCase().includes(filterByTitle.toLowerCase());
      }),
    );
  }, [filterByCompleted, filterByTitle]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByCompleted={filterByCompleted}
                onFilterChange={handlerFilterChange}
                filterByTitle={filterByTitle}
                onFilterByTitleChange={handlerFilterByTitleChange}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  setSelectTodo={setSelectTodo}
                  selectTodo={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal selectTodo={selectTodo} setSelectTodo={setSelectTodo} />
      )}
    </>
  );
};
