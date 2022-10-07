/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filteredTodosFromServer, setFilteredTodosFromServer] = useState<Todo[]>([]);
  const [loadingFromServer, setLoadingFromServer] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [todoLoading, setTodoLoading] = useState(false);

  const [selectFiltration, setSelectFiltration] = useState('');
  const [inputFiltration, setInputFiltration] = useState('');

  const filtrationHandler = (select: string, input: string) => {
    let todos = todosFromServer;

    switch (select) {
      case 'active':
        todos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        todos = todos.filter(todo => todo.completed);
        break;
      default:
        todos = todosFromServer;
        break;
    }

    setFilteredTodosFromServer(todos.filter(todo => todo.title.includes(input)));
  };

  const searchHandlerReset = () => {
    setInputFiltration('');
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputFiltration(event.target.value);
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFiltration(event.target.value);
  };

  const startTodoLoading = () => {
    setTodoLoading(true);
  };

  const closeSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const getSelectedUser = async (selectedTodoInfo:Todo) => {
    const uploadedUser = await getUser(selectedTodoInfo.userId);
    const newTodo = {
      ...selectedTodoInfo,
      user: uploadedUser,
    };

    setSelectedTodo(newTodo);
    setTodoLoading(false);
  };

  async function getTodosFromServer() {
    const promise = await getTodos();

    setTodosFromServer(promise);
    setFilteredTodosFromServer(promise);
    setLoadingFromServer(false);
  }

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useEffect(() => {
    filtrationHandler(selectFiltration, inputFiltration);
  }, [selectFiltration, inputFiltration]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectHandler={selectHandler}
                searchHandler={searchHandler}
                searchHandlerReset={searchHandlerReset}
              />
            </div>

            <div className="block">
              {loadingFromServer && (
                <Loader />
              )}
              {todosFromServer.length > 0 && (
                <TodoList
                  todos={filteredTodosFromServer}
                  getUser={getSelectedUser}
                  startTodoLoading={startTodoLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {(selectedTodo !== null || todoLoading) && (
        <TodoModal
          todoLoading={todoLoading}
          selectedTodo={selectedTodo}
          closeSelectedTodo={closeSelectedTodo}
        />
      )}
    </>
  );
};
