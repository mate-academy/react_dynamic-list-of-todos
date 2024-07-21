/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export type FilterProperties = {
  filterType: 'all' | 'active' | 'completed';
  filterValue: string;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [userTodo, setUserTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isInfoClicked, setIsInfoClick] = useState<boolean>(false);
  const [filterProperties, setFilterProperties] = useState<FilterProperties>({
    filterType: 'all',
    filterValue: '',
  });

  const handleFilterChange = (
    callback: (prev: FilterProperties) => FilterProperties,
  ) => {
    setFilterProperties(callback);
  };

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  const loadUser = async (userId: number) => {
    const todosFromServer = await getUser(userId);

    setUser(todosFromServer);
  };

  useEffect(() => {
    loadTodos();
    setUser(null);
  }, []);

  const handleClickChangeUserId = (todo: Todo) => {
    setUserTodo(todo);
    setIsInfoClick(true);
    loadUser(todo?.userId);
  };

  const handleClickCloseTododetails = () => {
    setUser(null);
    setUserTodo(null);
    setIsInfoClick(false);
  };

  const todoFiltered = useMemo(() => {
    const { filterType: type, filterValue: value } = filterProperties;
    const isValueEmpty = value.length === 0;
    const filterCallback = (elem: Todo) =>
      elem.title.toLowerCase().includes(value.toLowerCase());

    if (type === 'all' && todos) {
      return isValueEmpty ? todos : todos.filter(el => filterCallback(el));
    }

    if (type === 'active' && todos) {
      const filterActive = todos.filter(el => !el.completed);

      return isValueEmpty
        ? filterActive
        : filterActive.filter(el => filterCallback(el));
    }

    if (type === 'completed' && todos) {
      const filterCompleted = todos.filter(el => el.completed);

      return isValueEmpty
        ? filterCompleted
        : filterCompleted.filter(el => filterCallback(el));
    }

    return todos;
  }, [todos, filterProperties]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterProperties={filterProperties}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {todos === null && <Loader />}
              {todoFiltered && (
                <TodoList
                  todos={todoFiltered}
                  chosedTodo={userTodo}
                  onCLickDetails={handleClickChangeUserId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isInfoClicked && (
        <TodoModal
          todo={userTodo}
          user={user}
          onClick={handleClickCloseTododetails}
        />
      )}
    </>
  );
};
