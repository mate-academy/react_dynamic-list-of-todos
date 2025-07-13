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
  const [originTodos, setOriginTodos] = useState<Todo[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setOriginTodos(todos);
        setTodoList(todos); // Initialize todoList with fetched todos
      })
      .finally(() => setLoadingStatus(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter originTodos={originTodos} setTodoList={setTodoList} />
            </div>

            <div className="block">
              {loadingStatus ? (
                <Loader />
              ) : (
                <TodoList
                  todoList={todoList}
                  setSelectedTodo={setSelectedTodo}
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
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
