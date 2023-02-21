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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
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

  if (inputState) {
    const normInputState = inputState.toLocaleLowerCase().trim();

    filteredTodos = filteredTodos.filter(({ title }) => title.toLocaleLowerCase()
      .includes(normInputState));
  }

  if (toggleFilter) {
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
                    onSetSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
