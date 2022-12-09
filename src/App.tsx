/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadedTodos, setIsLoadedTodos] = useState(false);
  const [checkedTodo, setCheckedTodo] = useState<Todo | null>(null);
  const [inputState, setInputState] = useState('');
  const [toggleFilter, setToggleFilter] = useState<boolean | null>(null);

  let filteredTodos = [...todos];

  const fetchData = useCallback(async () => {
    const data = await getTodos();

    setTodos(data);
    setIsLoadedTodos(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (inputState && inputState.length > 0) {
    const normInputState = inputState.toLocaleLowerCase().trim();

    filteredTodos = filteredTodos.filter(todo => todo.title.toLocaleLowerCase()
      .includes(normInputState));
  }

  if (toggleFilter !== null) {
    filteredTodos = filteredTodos.filter(todo => todo.completed === toggleFilter);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputState={inputState}
                setInputState={setInputState}
                setToggleFilter={setToggleFilter}
              />
            </div>

            <div className="block">
              {!isLoadedTodos
                ? (<Loader />)
                : (
                  <TodoList
                    todos={filteredTodos}
                    onSetCheckedTodo={setCheckedTodo}
                    checkedTodo={checkedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {checkedTodo && (
        <TodoModal
          checkedTodo={checkedTodo}
          onClose={() => setCheckedTodo(null)}
        />
      )}
    </>
  );
};
