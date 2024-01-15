/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { FilterBy } from './types/FilterBy';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingAll, setAllLoading] = useState(false);
  const [loadingModal, setModalLoading] = useState(false);
  const [todoModal, setTodoModal] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [filterInput, setFilterInput] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    setFilterInput(value);
  };

  useEffect(() => {
    switch (filterBy) {
      case FilterBy.All:
        setFilteredTodos(todos);
        break;
      case FilterBy.Active:
        setFilteredTodos(todos.filter(toddo => !toddo.completed));
        break;
      case FilterBy.Completed:
        setFilteredTodos(todos.filter(toddo => toddo.completed));
        break;
      default:
        break;
    }
  }, [todos, filterBy]);

  useEffect(() => {
    setFilteredTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.title.includes(filterInput));
    });
  }, [filterInput]);

  const loadAllTodds = async () => {
    const allGoods = await getTodos();

    setTodos(allGoods);
  };

  const loadUser = async () => {
    const userr = await getUser(1);

    setUser(userr);
  };

  useEffect(() => {
    setAllLoading(true);

    setTimeout(() => {
      loadAllTodds();
      loadUser();
      setAllLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilterBy={setFilterBy} handleFilterInput={handleFilterInput} />
            </div>

            <div className="block">
              {
                loadingAll ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filteredTodos}
                    setTodoModal={setTodoModal}
                    setModalLoading={setModalLoading}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {todoModal && (
        <TodoModal user={user} todoModal={todoModal} loadingModal={loadingModal} setTodoModal={setTodoModal} />
      )}
    </>
  );
};
