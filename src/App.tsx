import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum Options {
  active = 'active',
  completed = 'completed',
  all = 'all',
}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [targetRowId, settargetRowId] = useState(0);
  const [selectedOption, setSelectedOption] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [targetUserId, setTargetUserId] = useState(0);

  useEffect(() => {
    getTodos().then(items => setTodosFromServer(items));
  }, []);

  const listOfTodos = () => {
    let list = [...todosFromServer].filter(todo => (
      (todo.title).toLowerCase().includes(inputValue.toLowerCase())
    ));

    switch (selectedOption) {
      case Options.active:
        list = list.filter(todo => !todo.completed);
        break;

      case Options.completed:
        list = list.filter(todo => todo.completed);
        break;

      default:
        return list;
    }

    return list;
  };

  const targetTodo = listOfTodos().find(todo => todo.id === targetRowId);

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
              {todosFromServer.length
                ? (
                  <TodoList
                    todos={listOfTodos()}
                    targetRowId={targetRowId}
                    settargetRowId={settargetRowId}
                    setTargetUserId={setTargetUserId}
                  />
                ) : <Loader />}
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
