/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { handleFilteringTodos } from './utils/handleFilteringTodos';
import { AllOptions, Todo } from './types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isLoadingTodo, setIsLoadingTodo] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [value, setValue] = useState('');
  const [selectOption, setSelectOption] = useState(AllOptions.All);

  const visibleTodos = handleFilteringTodos(todos, value, selectOption);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setIsLoadingTodo(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={value}
                onValueChange={setValue}
                selectOption={selectOption}
                onSelectChange={setSelectOption}
              />
            </div>

            <div className="block">
              {isLoadingTodo ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  pressedTodo={selectedTodo}
                  onButtonClick={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onToggleModal={setSelectedTodo} />
      )}
    </>
  );
};
