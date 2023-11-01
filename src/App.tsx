/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { ShowType } from './types/ShowType';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [show, setShow] = useState<ShowType>(ShowType.all);
  const [filter, setFilter] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    getTodos().then((value) => {
      setTodosFromServer(value);
    });
    loaded.current = true;
  }, []);

  function onChangeShow(value: ShowType) {
    setShow(value);
  }

  function onChangeFilter(value: string) {
    setFilter(value);
  }

  function getFilteredTodos(newFilter:string, newShow:ShowType) {
    let todoCopy: Todo[] = [...todosFromServer];
    const lowerCaseFilter = newFilter.toLowerCase();

    if (newShow === ShowType.active) {
      todoCopy = todosFromServer.filter((todo) => !todo.completed);
    }

    if (newShow === ShowType.completed) {
      todoCopy = todosFromServer.filter((todo) => todo.completed);
    }

    if (newShow === ShowType.all) {
      todoCopy = [...todosFromServer];
    }

    return todoCopy.filter((todo) => todo.title.toLowerCase().includes(lowerCaseFilter));
  }

  const todos = getFilteredTodos(filter, show);

  function onSelectedTodo(value: Todo | null) {
    setSelectedTodo(value);
  }

  function changeShowModal(value: boolean) {
    setShowModal(value);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                show={show}
                filter={filter}
                onChangeShow={() => onChangeShow}
                onChangeFilter={() => onChangeFilter}
              />
            </div>

            <div className="block">
              {!loaded.current && <Loader />}
              <TodoList
                todos={todos}
                selectedTodo={selectedTodo}
                onSelectedTodo={() => onSelectedTodo}
                changeShowModal={() => changeShowModal}
              />
            </div>
          </div>
        </div>
      </div>
      {showModal && selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodo={() => onSelectedTodo}
          changeShowModal={() => changeShowModal}
        />
      )}
    </>
  );
};
