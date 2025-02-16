/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { GroupStatusTypes } from './types/TextField';
import { TodoModal } from './components/TodoModal/TodoModal';
import { getFilteredTodos } from './utils/FilterTodos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  const [filteredStatus, setFilteredStatus] = useState<GroupStatusTypes>(
    GroupStatusTypes.ALL,
  );
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(result => {
        setTodos(result);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, textInput, filteredStatus);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                textInput={textInput}
                setTextInput={setTextInput}
                filteredStatus={filteredStatus}
                setFilteredStatus={setFilteredStatus}
              />
            </div>

            {isLoading && <Loader />}

            <div className="block">
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
