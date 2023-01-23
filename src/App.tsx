/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [theValue, setTheValue] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const visibleTodos = todos.filter(todo => {
    const isQueryInclude = todo.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
    let isValue = true;

    switch (theValue) {
      case 'active':
        isValue = !todo.completed;
        break;

      case 'completed':
        isValue = todo.completed;
        break;

      default:
        isValue = true;
    }

    return isQueryInclude && isValue;
  });

  const selectTodoId = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const selectedTodo = visibleTodos.find(todo => (
    todo.id === selectedTodoId
  ));

  const selectValue = (value: string) => {
    setTheValue(value);
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  const changeInSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  const closeSelectedTodo = () => {
    setSelectedTodoId(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                value={theValue}
                handleOnChange={changeInSearchQuery}
                handleOnDelete={clearSearchQuery}
                handleOnFilter={selectValue}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoById={selectedTodoId}
                    handleSelectTodo={selectTodoId}
                  />
                )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          handleOnClose={closeSelectedTodo}
        />
      )}
    </>
  );
};
