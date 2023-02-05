/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [loadedTodos, setLoadedTodos] = useState<Todo[]>([]);
  const [selectOption, setSelectOption] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(0);

  const selectTodo = (todoId: number) => {
    setSelectedId(todoId);
  };

  const loadWrapper = async () => {
    setLoadedTodos(await getTodos());
  };

  let filteredTodos = [...loadedTodos];

  if (selectOption === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  if (selectOption === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (query) {
    const lowQuery = query.toLowerCase();

    filteredTodos = filteredTodos.filter(todo => todo.title.includes(lowQuery));
  }

  const foundTodo = loadedTodos.find(todo => todo.id === selectedId) as Todo;

  const closeTab = () => {
    setSelectedId(0);
  };

  useEffect(() => {
    loadWrapper();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectOption={selectOption}
                onSetSelectOption={setSelectOption}
                onQuery={query}
                onSetQuery={setQuery}

              />
            </div>

            <div className="block">
              {loadedTodos.length === 0
                ? (<Loader />)
                : (

                  <TodoList
                    todos={filteredTodos}
                    activeTodo={selectedId}
                    onSelectTodo={selectTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedId && (
        <TodoModal
          todo={foundTodo}
          onCloseTab={closeTab}

        />
      )}
    </>
  );
};
