import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/EnumFilter';
import { FiltersType } from './types/Filter';
import { EyeId } from './types/EyeId';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTOdos] = useState<Todo[]>([]);

  const [todo, setTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [loader, setLoader] = useState(true);
  const [modalLoader, setModalLoader] = useState(true);

  const [pickedEye, setPickedEye] = useState<EyeId | null>(null);
  const [filters, setFilters] = useState<FiltersType>({
    option: Filter.All as Filter,
    filteredQuery: '',
  });

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setFilteredTOdos(fetchedTodos);
      })
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    setTodos(
      filteredTodos.filter(t => {
        const filteredByQuery = t.title
          .toLowerCase()
          .includes(filters.filteredQuery.toLowerCase());

        const filterOption =
          filters.option === Filter.Active
            ? !t.completed
            : filters.option === Filter.Completed
              ? t.completed
              : filters.option === Filter.All;

        return filterOption && filteredByQuery;
      }),
    );
  }, [filteredTodos, filters]);

  const handleChangeFilters = (filterOption: FiltersType) => {
    setFilters({
      option: filterOption.option as Filter,
      filteredQuery: filterOption.filteredQuery,
    });
  };

  useEffect(() => {
    if (pickedEye?.userId) {
      getUser(pickedEye?.userId)
        .then(setUser)
        .finally(() => setModalLoader(false));

      setTodo(todos.find(t => t.id === pickedEye?.todoId) || null);
    }
  }, [todos, pickedEye]);

  const handleGetModal = (eye: EyeId | null) => {
    setPickedEye(eye);

    if (eye === null) {
      setTodo(null);
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
                getChangeFilters={handleChangeFilters}
                filters={filters}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  getUserAndTodo={handleGetModal}
                  IdTodo={todo?.id}
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
          modalLoader={modalLoader}
          getModal={handleGetModal}
        />
      )}
    </>
  );
};
