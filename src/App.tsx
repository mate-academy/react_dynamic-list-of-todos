/* eslint-disable max-len */
import React, {
  ChangeEvent, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { SelectValue } from './types/SelectValues';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState(SelectValue.All);
  const [modal, setModal] = useState<boolean>(false);
  const [checkedUserId, setCheckedUserId] = useState<number>(0);
  const [user, setUser] = useState<User | undefined>();
  const [todoSelected, setTodoSelected] = useState<Todo>();

  const filterSelectedTodos = () => {
    switch (selectedValue) {
      case SelectValue.All:
        return todos;
      case SelectValue.Completed:
        return todos.filter((todo) => todo.completed);
      case SelectValue.Active:
        return todos.filter((todo) => !todo.completed);
      default:
        return [];
    }
  };

  const todosFilter = (todosFromServer: Todo[], query: string) => {
    const queryLower = query.toLowerCase().trim();

    return todosFromServer.filter((todo:Todo) => todo.title.includes(queryLower));
  };

  const visibleTodos = todosFilter(filterSelectedTodos(), searchQuery);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  useMemo(() => {
    getUser(checkedUserId).then(setUser);
  }, [checkedUserId]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value as SelectValue);
  };

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const resetModal = () => {
    setModal(false);
  };

  const handleModal = (todo: Todo) => () => {
    setModal(true);
    setCheckedUserId(todo.userId);
    setTodoSelected(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedValue={selectedValue}
                searchQuery={searchQuery}
                onChangeQuery={handleSearchQuery}
                onChangeSelect={handleSelectChange}
                clearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {!todos.length && (
                <Loader />
              )}
              <TodoList
                todos={visibleTodos}
                handleModal={handleModal}
                selectedUserId={checkedUserId}
              />
            </div>
          </div>
        </div>
      </div>

      {modal && todoSelected && user && (
        <TodoModal user={user} todoSelected={todoSelected} resetModal={resetModal} />
      )}
    </>
  );
};
