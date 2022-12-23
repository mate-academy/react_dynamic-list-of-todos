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
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [targetRowId, settargetRowId] = useState(0);
  const [selectedOption, setSelectedOption] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [targetUserId, setTargetUserId] = useState(0);

  useEffect(() => {
    getTodos().then(items => setTodosFromServer(items));
  }, []);

  let listOfTodos = [...todosFromServer];

  function filterBy(value: string, subStr: string) {
    switch (value) {
      case 'active':
        listOfTodos = [...todosFromServer]
          .filter(todo => !todo.completed)
          .filter(item => item.title.includes(subStr.toLowerCase()));
        break;

      case 'completed':
        listOfTodos = [...todosFromServer]
          .filter(todo => todo.completed)
          .filter(item => item.title.includes(subStr.toLowerCase()));
        break;

      default:
        listOfTodos = [...todosFromServer].filter(
          item => item.title.includes(subStr.toLowerCase()),
        );
        break;
    }
  }

  filterBy(selectedOption, inputValue);

  const targetTodo = listOfTodos.find(todo => todo.id === targetRowId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedOption={setSelectedOption}
                setInputValue={setInputValue}
                inputValue={inputValue}
              />
            </div>

            <div className="block">
              {!listOfTodos.length && <Loader />}
              {listOfTodos.length && (
                <TodoList
                  todos={listOfTodos}
                  targetRowId={targetRowId}
                  settargetRowId={settargetRowId}
                  setTargetUserId={setTargetUserId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {targetRowId !== 0 && (
        <TodoModal
          targetUserId={targetUserId}
          setTargetUserId={setTargetUserId}
          settargetRowId={settargetRowId}
          targetTodo={targetTodo}
        />
      )}
    </>
  );
};
