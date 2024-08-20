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
import { TodoState } from './types/TodoState';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [inputQuery, setInputQuery] = useState('');
  const [selectQuery, setSelectQuery] = useState<string>(TodoState.ALL);

  const showSelectedTodo = (todoId: number) => {
    const receivedTodo = todos.find(todo => todo.id === todoId) || null;

    setSelectedTodo(receivedTodo);
  };

  useEffect(() => {
    getTodos().then(todosFromServer => {
      let filteredTodos = todosFromServer;
      const preparedInputQuery = inputQuery.trim().toLowerCase();

      if (preparedInputQuery) {
        filteredTodos = filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(preparedInputQuery),
        );
      }

      if (selectQuery !== TodoState.ALL) {
        if (selectQuery === TodoState.COMPLETED) {
          filteredTodos = filteredTodos.filter(todo => todo.completed);
        }

        if (selectQuery === TodoState.ACTIVE) {
          filteredTodos = filteredTodos.filter(todo => !todo.completed);
        }
      }

      setTodos(filteredTodos);
    });
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputQuery={inputQuery}
                setInputQuery={setInputQuery}
                selectQuery={selectQuery}
                setSelectQuery={setSelectQuery}
              />
            </div>

            <div className="block">
              {todos.length !== 0 ? (
                <TodoList
                  todos={todos}
                  showSelectedTodo={showSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
