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
import { AllOptions } from './types/AllOptions';
import { handleFilteringTodos } from './utils/handleFilteringTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModal, setIsModal] = useState(false);

  const [loadingTodo, setLoadingTodo] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  const [pressedTodo, setPressedTodo] = useState<Todo | null>(null);
  const [pressedTodoUser, setPressedTodoUser] = useState<User | null>(null);

  const [value, setValue] = useState('');
  const [selectOption, setSelectOption] = useState(AllOptions.All);

  const handleShowDetails = (todo: Todo | null, isShow: boolean) => {
    setIsModal(isShow);
    setPressedTodo(todo);
  };

  const visibleTodos = handleFilteringTodos(todos, value, selectOption);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setLoadingTodo(false));
  }, []);

  useEffect(() => {
    if (pressedTodo !== null) {
      getUser(pressedTodo.userId)
        .then(setPressedTodoUser)
        // eslint-disable-next-line no-console
        .catch(console.error)
        .finally(() => setLoadingUser(false));
    }

    return () => {
      setLoadingUser(true);
    };
  }, [pressedTodo]);

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
              {loadingTodo && <Loader />}
              {!loadingTodo && (
                <TodoList
                  todos={visibleTodos}
                  pressedTodo={pressedTodo}
                  onButtonClick={handleShowDetails}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModal && (
        <TodoModal
          todo={pressedTodo}
          user={pressedTodoUser}
          loading={loadingUser}
          onToggleModal={handleShowDetails}
        />
      )}
    </>
  );
};
