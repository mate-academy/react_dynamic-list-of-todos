/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { TodoWithUser } from './types/TodoWithUser';
import { FilterType } from './types/FilterType';
import { ifInclude } from './components/IfInclude';

async function loadTodos() {
  const todosFromServer = await getTodos();

  return todosFromServer;
}

async function loadUserForTodo(todo:Todo) {
  const userFromServer = await getUser(todo.userId);

  return userFromServer;
}

export const App: React.FC = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [openedTodo, setOpenedTodo] = useState<TodoWithUser | null>(null);
  const [isDataLoad, setIsDataLoaded] = useState(false);
  const [isUserLoad, setIsUserLoaded] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosServer, setTodosServer] = useState<Todo[]>([]);
  const openModal = (todo:Todo) => {
    setIsOpenedModal(true);
    loadUserForTodo(todo).then(res => {
      setOpenedTodo({
        ...todo,
        user: res,
      });
      setIsUserLoaded(true);
    });
  };

  const closeModal = () => {
    setIsOpenedModal(false);
    if (openedTodo) {
      setOpenedTodo(null);
    }
  };

  const [statusFilter, setStatusFilter] = useState<string>(FilterType.All);
  const [input, setInput] = useState('');

  const filterTodos = (filter:string, inputNew:string) => {
    switch (filter) {
      case FilterType.Active:
        setTodos(todosServer.filter(todo => !todo.completed && ifInclude(todo.title, inputNew)));
        break;
      case FilterType.Completed:
        setTodos(todosServer.filter(todo => todo.completed && ifInclude(todo.title, inputNew)));
        break;

      default:
        setTodos(todosServer.filter(
          todo => ifInclude(todo.title, inputNew),
        ));
        break;
    }
  };

  const onChangeFilter = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
    filterTodos(event.target.value, input);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    filterTodos(statusFilter, event.target.value);
  };

  const clearInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setInput('');
    filterTodos(statusFilter, '');
  };

  useEffect(() => {
    loadTodos().then(res => {
      setTodos(res);
      setTodosServer(res);
      setIsDataLoaded(true);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onChangeFilter={onChangeFilter} statusFilter={statusFilter} input={input} onChangeInput={onChangeInput} clearInput={clearInput} />
            </div>

            <div className="block">
              {isDataLoad
                ? <TodoList todos={todos} openModal={openModal} openedTodoId={openedTodo ? openedTodo.id : 0} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isOpenedModal && <TodoModal todo={openedTodo} isDataLoad={isUserLoad} closeModal={closeModal} />}
    </>
  );
};
