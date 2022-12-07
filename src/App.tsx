/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import { getTodos } from './api';
// import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState(0);
  // const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchResponse = async () => {
      const resultTodos = await getTodos();

      setTodos(resultTodos);
    };

    fetchResponse();
  }, []);

  // const updateSelectedItems = (event: { target: { value: React.SetStateAction<number>; }; }) => {
  //   setSelectedOption(event.target.value);
  //   console.log(event.target.value, '<= event.target.value');

  //   const filterByActive = todos.filter(todo => todo.completed === false);
  //   const filterByCompleted = todos.filter(todo => todo.completed === true);

  //   switch (selectedOption) {
  //     case 0:
  //       return todos;

  //     case 1:
  //       return setTodos(filterByActive);

  //     case 2:
  //       return setTodos(filterByCompleted);

  //     default:
  //       return null;
  //   }
  // };

  const updateSelectedItems = (event: { target: { value: React.SetStateAction<number>; }; }) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
    setTodos(todos.filter(todo => todo.completed === false));
  };

  const displayedTodos = todos.filter(todo => {
    return todo.title.includes(query.trim().toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={setQuery}
                updateSelectedItems={updateSelectedItems}
                query={query}
                selectedOption={selectedOption}
              />
            </div>

            <div className="block">
              {/* Here should be condition when to show todos */}
              {/* <Loader /> */}
              <TodoList todos={displayedTodos} />
            </div>
          </div>
        </div>
      </div>
      {/* Here should be condition for show the TodoModal */}
      {/* <TodoModal /> */}
    </>
  );
};
