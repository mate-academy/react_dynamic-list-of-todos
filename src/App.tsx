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
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [load, setLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [selectedToDo, setSelectedTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });
  const [loadModal, setLoadModal] = useState(false);
  const [closedEyeID, setClosedEye] = React.useState<number>(0);
  const [select, setSelect] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setLoad(true);
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoad(false)); // hide loader after request finishes
  }, []);
  const filterTodos = () => {
    let result = [...todos];

    // filter by status
    if (select === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (select === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    // filter by search
    if (inputValue) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(inputValue.toLowerCase()),
      );
    }

    setFilteredTodos(result);
  };
  useEffect(() => {
    filterTodos();
  }, [select, inputValue, todos]);
  const clickedID = (todo: Todo) => {
    setLoadModal(true);
    setShowModal(true);
    setSelectedTodo(todo);
    getUser(todo.userId)
      .then(data => setUserData(data))
      .finally(() => {
        setLoadModal(false);
      });
  };
  const resetClosedEyeID = () => {
    setClosedEye(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                select={setSelect}
                selected={select}
                search={setInputValue}
                inputValue={inputValue}
              />
            </div>

            <div className="block">
              <Loader loadingStatus={load} />
              <TodoList
                todos={filteredTodos}
                clickedID={clickedID}
                closedEyeID={closedEyeID}
                setClosedEye={setClosedEye}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        showModal={showModal}
        userData={userData}
        loadModal={loadModal}
        todo={selectedToDo}
        modalClose={() => {
          setShowModal(false);
          resetClosedEyeID();
        }}
      />
    </>
  );
};
