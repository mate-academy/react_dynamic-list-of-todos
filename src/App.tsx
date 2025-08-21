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

function preperedData(
  dataTodos: Todo[],
  groupBy: string,
  searchQuery: string,
): Todo[] {
  let visibleTodos = [...dataTodos];

  visibleTodos = visibleTodos.filter((todos: Todo) => {
    switch (groupBy) {
      case 'active':
        return todos.completed === false;

      case 'completed':
        return todos.completed === true;

      default:
        return true;
    }
  });

  if (searchQuery) {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    visibleTodos = visibleTodos.filter(todos => {
      return todos.title.includes(normalizedQuery);
    });
  }

  return visibleTodos.sort((a, b) => a.id - b.id);
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [groupBy, setGroupBy] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<User>();
  const [choosenTodoData, setChoosenTodoData] = useState<Todo>();

  const visibleData = preperedData(todos, groupBy, searchQuery);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
    });
  }, []);
  console.log(todos);

  // const handleGetDataUser = () => {
  //   getUser(choosenTodoData?.userId).then(userFromServer => {
  //     setUser(userFromServer);
  //     console.log(userFromServer);
  //   });
  // };

  const handleOptionSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupBy(event.target.value);
  };

  const handleSetSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleResetQuery = () => {
    setSearchQuery('');
  };

  const handleChoosenDataTodo = (todo: Todo) => {
    setChoosenTodoData(todo);
    getUser(todo.userId).then(userFromServer => {
      setUser(userFromServer);
      console.log(userFromServer);
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleOptionSort={handleOptionSort}
                searchQuery={searchQuery}
                handleSetSearchQuery={handleSetSearchQuery}
                handleResetQuery={handleResetQuery}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList
                todos={visibleData}
                handleChoosenDataTodo={handleChoosenDataTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        showModal={showModal}
        user={user}
        choosenTodoData={choosenTodoData}
      />
    </>
  );
};
