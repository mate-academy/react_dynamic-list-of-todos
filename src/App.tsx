/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [todoId, setTodoId] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [filterByValue, setFilterByValue] = useState<string>('all');
  const [filterByText, setFilterByText] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
        setLoader(true);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterByValue) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return todo;
    }
  }).filter(todo => {
    return todo.title.toLowerCase().includes(filterByText.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                value={filterByValue}
                text={filterByText}
                setValue={setFilterByValue}
                setText={setFilterByText}
              />
            </div>

            <div className="block">
              { !loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={todoId}
                  selectedTodo={(todo) => setTodoId(todo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {todoId !== 0 && (
        <TodoModal
          todoId={todoId}
          todos={todos}
          selectedTodo={(todo) => setTodoId(todo)}
        />
      )}
    </>
  );
};
