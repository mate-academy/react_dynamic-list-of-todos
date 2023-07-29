/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);

  const [todos, setTodos] = useState<Todo[] >([]);
  const [selectAll, setSelectAll] = useState('All');
  const [selectedTodos, setSelectedTodos] = useState('');

  const [loaderTodo, setLoaderTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<User | null>(null);
  const [todoUser, setTodoUser] = useState<Todo | null>(null);

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .finally(() => setLoader(false));
    }, 250);
  }, []);

  const search = (userId:number, id: number) => {
    setLoaderTodo(true);

    setTimeout(() => {
      getUser(userId)
        .then(setSelectedTodo)
        .finally(() => setLoaderTodo(false));
      const [todoUs] = todos.filter(toddo => toddo.id === id);

      setTodoUser(todoUs);
    }, 500);
  };

  let selectTodo = [...todos];
  const text = selectedTodos.trim().toLowerCase();

  useMemo(() => {
    if (selectedTodos) {
      selectTodo = selectTodo.filter(tod => tod.title.toLowerCase().includes(text));
    }
  }, [selectedTodos, selectAll]);

  useMemo(() => {
    switch (selectAll) {
      case 'active':
        selectTodo = selectTodo.filter(tod => tod.completed === true);
        break;

      case 'completed':
        selectTodo = selectTodo.filter(tod => tod.completed === false);
        break;

      default:
        break;
    }
  }, [selectAll, selectedTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectAll={selectAll}
                selectedTodos={selectedTodos}
                setSelectAll={setSelectAll}
                setSelectedTodos={setSelectedTodos}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              <TodoList
                todos={selectTodo}
                todoUser={todoUser}
                search={search}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          loaderTodo={loaderTodo}
          selectedTodo={selectedTodo}
          todoUser={todoUser}
          setSelectedTodo={setSelectedTodo}
          setTodoUser={setTodoUser}
        />
      )}

    </>
  );
};
