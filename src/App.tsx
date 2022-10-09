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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [valueOption, setValueOption] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [clickedButtonUserInfo, setClickedButtonUserInfo] = useState(false);

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
                onInputValue={inputValue}
              />
            </div>

            <div className="block">
              {!todos.length ? <Loader />
                : (
                  <TodoList
                    todos={filterList}
                    todoId={todoId}
                    setTodoId={setTodoId}
                    setUserId={setUserId}
                    setClickedButtonUserInfo={setClickedButtonUserInfo}
                    clickedButtonUserInfo={clickedButtonUserInfo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todos={todos}
          todoId={todoId}
          userId={userId}
          selectTodoId={(todoID) => setTodoId(todoID)}
        />
      )}
    </>
  );
};
