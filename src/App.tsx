// /* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
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
  const [isSelected, setIsSelected] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [complitedSelect, setComplitedSelect] = useState('all');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    (getTodos()
      .then(setTodos))
      .finally(() => setIsLoaded(false));
  }, []);

  const filteredTodos = useMemo(() => todos.filter(todo => {
    let result: boolean;

    if (complitedSelect === 'active') {
      result = todo.completed === false;
    } else if (complitedSelect === 'completed') {
      result = todo.completed === true;
    } else {
      return todo;
    }

    return result;
  })
    .filter(todo => {
      if (inputValue === '') {
        return todo;
      }

      return todo.title.startsWith(inputValue);
    }), [todos, complitedSelect, inputValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setComplitedSelect={setComplitedSelect}
                complitedSelect={complitedSelect}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>

            <div className="block">
              {isLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    setIsSelected={setIsSelected}
                    setIsLoaded={setIsLoaded}
                    setSelectedTodoId={setSelectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isSelected={isSelected}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
        setIsSelected={setIsSelected}
        selectedTodoId={selectedTodoId}
        todos={todos}
      />
    </>
  );
};
