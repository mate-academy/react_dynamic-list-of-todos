/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isComplete, setIsComplete] = useState<string | boolean>('all');
  const [query, setQuery] = useState<string>('');
  const [isShownPostInfo, setIsShownPostInfo] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const [selectedTodo, setSelectedTodo] = useState<Todo>({} as Todo);

  const handleInputChange = (e: string): void => {
    setQuery(e);
  };

  const handleShowPostInfo = (todo: Todo): void => {
    getUser(todo.userId).then(user => {
      setSelectedUser(user);
      setSelectedTodo(todo);
    });
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (!query) {
      return setTodos(todos);
    }
  }, [query, filteredTodos, todos]);

  useEffect(() => {
    getTodos().then(todosFrom => {
      setTodos(todosFrom);
    });
  }, []);

  useEffect(() => {
    if (isComplete === 'all') {
      getTodos().then(todosFrom => {
        setTodos(todosFrom);
      });
    } else if (isComplete === true) {
      getTodos().then(todosFrom => {
        setTodos(todosFrom.filter(todo => todo.completed));
      });
    } else if (isComplete === false) {
      getTodos().then(todosFrom => {
        setTodos(todosFrom.filter(todo => !todo.completed));
      });
    }
  }, [isComplete]);

  const filterTodos = (param: string) => {
    switch (param) {
      case 'all':
        setIsComplete('all');
        break;
      case 'completed':
        setIsComplete(true);
        break;
      case 'active':
        setIsComplete(false);
        break;
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodos={filterTodos}
                handleInputChange={handleInputChange}
                query={query}
              />
            </div>

            <div className="block">
              <Loader />
              <TodoList
                todos={filteredTodos}
                handleShowPostInfo={handleShowPostInfo}
                setIsShownPostInfo={setIsShownPostInfo}
                isShownPostInfo={isShownPostInfo}
              />
            </div>
          </div>
        </div>
      </div>

      {isShownPostInfo && (
        <TodoModal
          setIsShownPostInfo={setIsShownPostInfo}
          selectedUser={selectedUser}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
