/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
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
  const filteredTodos = useMemo(() => {
    switch (filterBy) {
      case FilterBy.All:
        return todos;
      case FilterBy.Active:
        return todos.filter(toddo => !toddo.completed);
      case FilterBy.Completed:
        return todos.filter(toddo => toddo.completed);
      default:
        return todos;
    }
  }, [todos, filterBy]);
  const [filteredTodosState, setFilteredTodosState] = useState(filteredTodos);

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
  };

  useEffect(() => {
    setFilteredTodosState(filteredTodos.filter(todo => todo.title.toLowerCase().includes(filterInput.toLowerCase())));
  }, [filterInput, filteredTodos]);

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
              <TodoFilter
                setFilterBy={setFilterBy}
                handleFilterInput={handleFilterInput}
                setFilterInput={setFilterInput}
                filterInput={filterInput}
              />
            </div>

            <div className="block">
              {
                loadingAll ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filteredTodosState}
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
