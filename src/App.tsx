/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { InitialStates, Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [user, setUser] = useState<User>();
  const [filterTodos, setFilterTodos] = useState<InitialStates>({
    query: '',
    select: 'all',
  });

  const filterResponse = useCallback(
    (responseTodos: Todo[]) => {
      let filteredTodos = [...responseTodos];

      if (filterTodos.query !== '') {
        filteredTodos = responseTodos.filter(todo =>
          todo.title.toLowerCase().includes(filterTodos.query.toLowerCase()),
        );
        setTodos(filteredTodos);
      }

      if (filterTodos.select === 'completed') {
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
        setTodos(filteredTodos);
      } else if (filterTodos.select === 'active') {
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        setTodos(filteredTodos);
      } else {
        setTodos(filteredTodos);
      }
    },
    [filterTodos.query, filterTodos.select],
  );

  const handleFilterTodos = (filter: InitialStates): void => {
    setFilterTodos(filter);
  };

  const handleToggleModal = (toggle: boolean, seleceted?: Todo): void => {
    if (toggle == false) {
      setUser(undefined);
      setSelectedTodo(undefined);
    }

    setToggleModal(toggle);
    if (seleceted) {
      setSelectedTodo(seleceted);
    }
  };

  useEffect(() => {
    getTodos().then(response => filterResponse(response));

    if (selectedTodo) {
      getUser(selectedTodo.userId).then(response => setUser(response));
    }
  }, [selectedTodo, filterTodos, filterResponse]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleFilterTodos={handleFilterTodos}
                filterTodos={filterTodos}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={todos}
                  handleToggleModal={handleToggleModal}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {toggleModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleToggleModal={handleToggleModal}
          user={user}
        />
      )}
    </>
  );
};
