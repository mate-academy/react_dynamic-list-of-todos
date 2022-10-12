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
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [valueOption, setValueOption] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [activeTodo, setActiveTodo] = useState<Todo | undefined>();
  const [userInfo, setUserInfo] = useState<User>();

  const loadData = async () => {
    setTodos(await getTodos());
  };

  const filterList = todos.filter(todo => {
    switch (valueOption) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  }).filter(todo => todo.title.includes(inputValue.toLowerCase()));

  useEffect(() => {
    loadData();
  }, [valueOption]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onValueOption={setValueOption}
                onSetInputValue={setInputValue}
                inputValue={inputValue}
              />
            </div>

            <div className="block">
              {!todos.length ? <Loader />
                : (
                  <TodoList
                    todos={filterList}
                    setActiveTodo={setActiveTodo}
                    activeTodo={activeTodo}
                    setUserInfo={setUserInfo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo?.id && (
        <TodoModal
          activeTodo={activeTodo}
          setActiveTodo={setActiveTodo}
          userInfo={userInfo}
        />
      )}
    </>
  );
};
