// /* eslint-disable max-len */
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
  const [isSelected, setIsSelected] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({} as Todo);
  const [complitedSelect, setComplitedSelect] = useState('all');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    (getTodos()
      // .then(res => res.map((todo): Todo => ({
      //   ...todo,
      //   user: getUser(todo.userId).then(responce => responce.id),
      // })))
      .then(setTodos));
  }, []);

  const filteredTdos = todos.filter(todo => {
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
    });

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
              {todos.length === 0
                ? <Loader />
                // eslint-disable-next-line max-len
                : <TodoList todos={filteredTdos} setIsSelected={setIsSelected} setIsLoaded={setIsLoaded} setSelectedTodo={setSelectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isSelected={isSelected}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
        setIsSelected={setIsSelected}
        selectedTodo={selectedTodo}
      />
    </>
  );
};
