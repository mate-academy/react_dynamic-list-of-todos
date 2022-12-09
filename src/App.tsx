/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

// export enum SortType {
//   ALL = 'all',
//   ACTIVE = 'active',
//   COMPLITED = 'completed',
// }

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(visTodos => {
      setTodos(visTodos);
      setIsTodosLoaded(true);
    });
  }, []);

  let visibleTodos = [...todos].filter(todo => {
    switch (selectedOption) {
      case 'active':
        return todo.completed === false;

      case 'completed':
        return todo.completed === true;

      case 'all':
      default:
        return true;
    }
  });

  visibleTodos = visibleTodos
    .filter(todo => {
      const normQuery = query.toLocaleLowerCase();

      return todo.title.toLocaleLowerCase().includes(normQuery);
    });

  const onInfoButtonClick = (todo: Todo) => {
    getUser(todo.userId).then(user => setSelectedUser(user));

    setSelectedTodo(todo);
    setIsButtonClicked(true);
  };

  const onCrossButtonClick = () => {
    setSelectedUser(null);
    setSelectedTodo(null);
    setIsButtonClicked(false);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
  };

  const filterByInput = (str: string) => {
    setQuery(str);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={selectOption}
                onSearch={filterByInput}
              />
            </div>

            <div className="block">
              {!isTodosLoaded
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    onButtonClick={onInfoButtonClick}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {isButtonClicked && (
        <TodoModal
          user={selectedUser}
          todo={selectedTodo}
          onCrossClick={onCrossButtonClick}
        />
      )}
    </>
  );
};
