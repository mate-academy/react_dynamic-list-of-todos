/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState(allTodos);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const selectedTodo: Todo | null = allTodos.find((el: Todo) => el.id === selectedTodoId) || null;

  const BASE_URL = 'https://mate-academy.github.io'
  + '/react_dynamic-list-of-todos/api';

  const request = (url: any) => {
    return fetch(`${BASE_URL}${url}`)
      .then(response => {
        return response.json();
      })
      .then(result => result);
  };

  const getTodos = () => request('/todos.json');

  useEffect(() => {
    setIsLoaded(true);
    getTodos()
      .then(todos => {
        setAllTodos(todos);
      })
      .finally(() => {
        setIsLoaded(false);
      });
  }, []);

  const handleclick = (id: number) => {
    setSelectedTodoId(id);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                allTodos={allTodos}
                setFilterTodos={setFilterTodos}
              />
            </div>

            <div className="block">
              {isLoaded && (
                <Loader />
              )}

              <TodoList
                todos={filterTodos}
                selectTodo={handleclick}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}

    </>
  );
};
