/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const [selectTodo, setSelectTodo] = useState(0);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      const listTodos = await getTodos();

      setTodos(listTodos);
      setIsLoad(false);
      setVisibleTodos(listTodos);
    };

    loadTodos();
  }, []);

  const todosFilter = (inputType: string, typeSelect: string) => {
    let visibleMovies = todos.filter(
      ({ title }) => title.toLowerCase().includes(inputType),
    );

    if (typeSelect === 'active') {
      visibleMovies = todos
        .filter(({ completed }) => completed === false);
    }

    if (typeSelect === 'completed') {
      visibleMovies = todos
        .filter(({ completed }) => completed === true);
    }

    setVisibleTodos(visibleMovies);
  };

  const select = (todoId: number) => setSelectTodo(todoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getInput={todosFilter}
              />
            </div>

            <div className="block">
              {isLoad
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    select={select}
                    selectTodo={selectTodo}
                  />
                ) }
            </div>

            {selectTodo > 0 && (
              <TodoModal
                todo={visibleTodos.find(todo => todo.id === selectTodo)}
                select={select}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
