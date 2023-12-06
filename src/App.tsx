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
import { TodoDetail } from './types/TodoDetails';

export type FilterType = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todo, setTodo] = useState<TodoDetail | null>(null);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(null);
  const [selectType, setSelectType] = useState<FilterType>('all');
  const [query, setQuery] = useState<string>('');

  const startUp = async () => {
    const response = await getTodos();

    setTodos(response);
  };

  const selectTodo = async (select: Todo) => {
    setModalOn(true);
    const user = await getUser(select.userId);

    setTodo({ ...select, user });
  };

  const modalOff = () => {
    setModalOn(false);
    setTodo(null);
  };

  useEffect(() => {
    startUp();
  }, []);

  useEffect(() => {
    if (selectType === 'active') {
      setFilteredTodos(() => (
        todos?.filter((element) => element.completed === false) || []
      ));
    } else if (selectType === 'completed') {
      setFilteredTodos(() => (
        todos?.filter((element) => element.completed === true) || []
      ));
    } else {
      setFilteredTodos(() => todos || []);
    }

    if (query) {
      setFilteredTodos((prevTodos) => (
        prevTodos?.filter((element) => element.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) || []
      ));
    }
  }, [selectType, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectType={selectType}
                setSelectType={setSelectType}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos === null && (<Loader />)}

              {filteredTodos && (<TodoList todos={filteredTodos} selectTodo={selectTodo} selectedTodo={todo} />)}

            </div>
          </div>
        </div>
      </div>
      {modalOn && (<TodoModal todo={todo} modalOff={modalOff} />)}
    </>
  );
};

/*
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">

              <TodoList />
            </div>
          </div>
        </div>
      </div>

    </>
*/
