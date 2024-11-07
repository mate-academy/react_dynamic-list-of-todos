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
import { Filter } from './types/enumFilter';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loader, setLoader] = useState(true);
  const [flag, setFlag] = useState(Filter.All);
  const [modalLoad, setModalLoad] = useState(true);

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .finally(() => setLoader(false));
  }, []);

  const getFilteredByFlag = (filterFlag: Filter) => {
    switch (filterFlag) {
      case Filter.All:
        setFlag(Filter.All);
        getTodos().then(setTodos);
        break;
      case Filter.Active:
        setFlag(Filter.Active);
        getTodos()
          .then(fetchedTodos => fetchedTodos.filter(t => !t.completed))
          .then(setTodos);
        break;
      case Filter.Completed:
        setFlag(Filter.Completed);
        getTodos()
          .then(fetchTodos => fetchTodos.filter(t => t.completed))
          .then(setTodos);
        break;
      default:
        getTodos().then(setTodos);
        break;
    }
  };

  const getFilteredByValue = (value: string) => {
    if (value.trim() !== '') {
      setTodos(
        todos.filter(t => t.title.toLowerCase().includes(value.toLowerCase())),
      );
    } else {
      getFilteredByFlag(flag);
    }
  };

  const getUserAndTodo = (todoUserId: number) => {
    setModalLoad(true);

    setTodo(todos.find(t => t.userId === todoUserId) || null);

    getUser(todoUserId)
      .then(setUser)
      .finally(() => setModalLoad(false));
  };

  const handleCloseModal = () => {
    setUser(null);
    setTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByFlag={getFilteredByFlag}
                filteredByValue={getFilteredByValue}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  getUserAndTodo={getUserAndTodo}
                  todoId={todo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal
          user={user}
          todo={todo}
          loader={modalLoad}
          getClose={handleCloseModal}
        />
      )}
    </>
  );
};
