/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todoListFromServer, setTodoListFromServer] = useState<Todo[]>([]);
  const [visibleTodoList, setVisibleTodoList] = useState<Todo[]>(todoListFromServer);
  const [selectedTodo, setSelectedTodo] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  useEffect(() => {
    getTodos().then(todos => {
      setTodoListFromServer(todos);
      setVisibleTodoList(todos);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setVisibleTodoList={setVisibleTodoList}
                todoListFromServer={todoListFromServer}
              />
            </div>

            <div className="block">
              {todoListFromServer.length > 0
                ? (
                  <TodoList
                    todoList={visibleTodoList}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo.id && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
