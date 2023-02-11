import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setisLoading] = useState(true);
  const [activeTodoId, setActiveTodoId] = useState(0);

  const initialUser: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  };

  const [userDetails, setUserDetails] = useState(initialUser);

  const filterTodos = () => {
    return (todos.filter(todo => {
      const title = todo.title.toLowerCase();
      const input = inputValue.toLowerCase();
      const queryMatch = title.includes(input);

      switch (filter) {
        case 'active':
          return !todo.completed && queryMatch;

        case 'completed':
          return todo.completed && queryMatch;

        default:
          return queryMatch;
      }
    }));
  };

  const handleClick = (id: number, userId: number) => {
    setActiveTodoId(id);

    getUser(userId).then(user => {
      setUserDetails({
        ...user,
        id,
      });
    });
  };

  const closeUserCard = () => {
    setUserDetails(initialUser);
    setActiveTodoId(0);
  };

  const visibleTodos = filterTodos();

  const activeTodo = todos.filter(todo => todo.id === activeTodoId)[0];

  async function loadDataFromServer() {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setisLoading(false);
  }

  useEffect(() => {
    loadDataFromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectChange={setFilter}
                filter={filter}
                onChange={setInputValue}
                inputValue={inputValue}
              />
            </div>

            <div className="block">
              {!todos.length && isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    activeTodoId={activeTodoId}
                    onClick={handleClick}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {activeTodoId > 0 && (
        <TodoModal
          activeTodo={activeTodo}
          userDetails={userDetails}
          onClose={closeUserCard}
        />
      )}
    </>
  );
};
