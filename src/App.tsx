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
  const [arrOfTodos, setTodos] = useState<Todo[]>([]);
  const [sortParams, setSortParam] = useState({
    sortSelect: '',
    sortInput: '',
  });
  const [selectedTodo, setTodo] = useState<Todo | null>(null);

  const setFilterParam = (select: string, input: string) => {
    setSortParam({
      sortSelect: select,
      sortInput: input,
    });
  };

  const setSelectedTodo = (todo: Todo | null) => {
    setTodo(todo);
  };

  useEffect(() => {
    const fetchData = async () => {
      const arrayTodosFromServer = await getTodos();

      setTodos(arrayTodosFromServer);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={setFilterParam} />
            </div>

            <div className="block">
              {arrOfTodos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={arrOfTodos}
                  filter={sortParams}
                  onChangeTodo={setSelectedTodo}
                  currentTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null
      && (
        <TodoModal
          currentTodo={selectedTodo}
          onChangeTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
