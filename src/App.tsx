/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/todoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(TodoStatus.All);

  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectOption={setSelectedOption}
                setInputText={setInputText}
                inputText={inputText}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {todos.length > 0 && (
                <TodoList
                  todos={todos}
                  selectOption={selectedOption}
                  inputText={inputText}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
