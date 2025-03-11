/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api/api';
import { Filter } from './types/Filter';
import { getListToShow } from './utils/services';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(!todoList.length);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | undefined>();
  const [userTodo, setUserTodo] = useState<Todo>();

  useEffect(() => {
    if (!todoList.length) {
      getTodos()
        .then(data => setTodoList(data))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const updateFilter = (newFilter: Filter) => setFilter(newFilter);
  const updateSearch = (searchInput: string) => setSearchText(searchInput);
  const updateModal = () => setIsModal(x => !x);
  const updateUserId = (id: number) => setUserId(id);
  const updateUserTodo = (todo: Todo) => setUserTodo(todo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                applyFilter={updateFilter}
                applySearch={updateSearch}
                searchValue={searchText}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                list={getListToShow(todoList, filter, searchText)}
                isModal={isModal}
                updateModal={updateModal}
                updateUserId={updateUserId}
                updateUserTodo={updateUserTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {isModal && userId && userTodo && (
        <TodoModal
          userId={userId}
          userTodo={userTodo}
          updateModal={updateModal}
        />
      )}
    </>
  );
};
