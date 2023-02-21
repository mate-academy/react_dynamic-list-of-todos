import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { Options } from './types/Options';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { filteredTodos } from './components/utils';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currentTodo, setcurrentTodo] = useState<Todo | null>(null);
  const [isDataReady, setIsDataReady] = useState<boolean>(false);
  const [isClickedOnTodos, setIsClickedOnTodos] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [option, setOption] = useState<Options>(Options.ALL);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsDataReady(true);
    } catch {
      // eslint-disable-next-line no-alert
      alert('Sorry, there is no todos yet');
      setIsDataReady(true);
    }
  };

  const loadUserInfo = async (userId:number) => {
    const userFromServer = await getUser(userId);

    setUser(userFromServer);
    setIsDataReady(true);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = filteredTodos(todos, option, query);

  const onTodoBtnClick = (userId: number, todo:Todo) => {
    setIsClickedOnTodos(true);
    setIsDataReady(false);
    setcurrentTodo(todo);

    loadUserInfo(userId);
  };

  const closeModal = () => {
    setIsClickedOnTodos(false);
    setUser(null);
    setcurrentTodo(null);
  };

  const selectedTodos = (selectedOption: Options) => {
    setOption(selectedOption);
  };

  const filterByQuery = (searchQuery:string) => {
    setQuery(searchQuery);
  };

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectedOption={selectedTodos}
                onInputChange={filterByQuery}
                inputValue={query}
                onClearQuery={clearQuery}
              />
            </div>

            <div className="block">
              {!isDataReady && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={currentTodo}
                clickHandler={onTodoBtnClick}
              />
            </div>
          </div>
        </div>
      </div>

      {(!isDataReady || isClickedOnTodos)
          && (
            <TodoModal
              user={user}
              todo={currentTodo}
              onCloseBtn={closeModal}
            />
          )}
    </>
  );
};
