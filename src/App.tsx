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

export enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
export const App: React.FC = () => {

  const [todos, setTodo] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>(FilterType.All);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingModal, setLoadingModal] = useState(true);

  const [modal, setModal] = useState(false);


  useEffect(() => {
    if (selectedTodo?.userId) {
      setLoadingModal(true);
      getUser(selectedTodo?.userId).then(fetchedUser => setUser(fetchedUser));
      setTimeout(() => {
        setLoadingModal(false);
      }, 500);
    }
  }, [selectedTodo]);

  useEffect(() => {
    getTodos().then(todoFromServer => {
      setTodo(todoFromServer);
      setFilterTodos(todoFromServer);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    let updatedTodos = [...todos];

    switch (filter) {
      case FilterType.Active:
        updatedTodos = updatedTodos.filter(todo => !todo.completed);
        break;
      case FilterType.Completed:
        updatedTodos = updatedTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (searchFilter) {
      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchFilter.toLowerCase()),
      );
    }

    setTimeout(() => {
      setFilterTodos(updatedTodos);
      setLoading(false);
    }, 500);
  }, [filter, searchFilter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                filterTodos={filterTodos}
                setModal={setModal}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <TodoModal
          setModal={setModal}
          selectedTodo={selectedTodo}
          user={user}
          loadingModal={loadingModal}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
