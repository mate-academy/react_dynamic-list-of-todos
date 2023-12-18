/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Status } from './types/Status';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterTodo } from './service/FilterTodo';
import { getTodos } from './service/todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedValue, setSelectedValue] = useState(Status.All);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('');
  const [hasClear, setHasClear] = useState(true);
  const [selectedtodo, setSelectedTodo] = useState<Todo | undefined>();

  const getTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as Status;

    setSelectedValue(newValue);
  };

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;

    setText(newText);
    setHasClear(false);
  };

  const handleClearButton = () => {
    setText('');
    setHasClear(true);
  };

  const handleCloseButton = () => {
    setSelectedTodo(undefined);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, [selectedValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleOption={handleValue}
                value={selectedValue}
                handleText={handleText}
                text={text}
                handleClear={handleClearButton}
                hasClear={hasClear}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={FilterTodo(todos, text, selectedValue)}
                selectedTodo={selectedtodo}
                userInfo={getTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {!!selectedtodo
        && (
          <TodoModal
            selectedTodo={selectedtodo}
            close={handleCloseButton}
          />
        )}
    </>
  );
};
