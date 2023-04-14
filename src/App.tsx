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
  const [errors, setError] = useState<string>('');

  const setFilterParam = (select: string, input: string) => {
    setSortParam({
      sortSelect: select,
      sortInput: input,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const arrayTodosFromServer = await getTodos();

        setTodos(arrayTodosFromServer);
      } catch {
        setError('Error: Something wrong, try latter');
      }
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
              {arrOfTodos.length === 0 && !errors && (
                <Loader />
              )}
              {errors && (
                <p>{errors}</p>
              )}
              {arrOfTodos.length !== 0 && !errors && (
                <TodoList
                  todos={arrOfTodos}
                  filter={sortParams}
                  onChangeTodo={setTodo}
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
          onChangeTodo={setTodo}
        />
      )}
    </>
  );
};
