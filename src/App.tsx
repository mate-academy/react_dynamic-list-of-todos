/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

enum SortType {
  ALL = 'all',
  BY_ACTIVE = 'active',
  BY_COMPLETE = 'completed',
}

const filterTodo = (
  todoList: Todo[],
  qery: string,
  status: SortType,
): Todo[] => {
  const listClonWithQuery = todoList.filter(todo =>
    todo.title.toLowerCase().includes(qery.toLowerCase()),
  );
  let res: Todo[] = [];

  switch (status) {
    case SortType.ALL:
      res = listClonWithQuery;
      break;

    case SortType.BY_ACTIVE:
      res = listClonWithQuery.filter(todo => !todo.completed);
      break;

    case SortType.BY_COMPLETE:
      res = listClonWithQuery.filter(todo => todo.completed);
      break;
  }

  return [...res].sort((todo1, todo2) => todo1.id - todo2.id);
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [qery, setQery] = useState<string>('');
  const [status, setStatus] = useState<SortType>(SortType.ALL);

  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  const [loader, setLoader] = useState(false);

  const handleSelect = (todo: Todo) => setSelectTodo(todo);
  const handledeleteSelect = () => setSelectTodo(null);
  const handleChangeStatus = (newStatus: SortType) => setStatus(newStatus);
  const onChangeQuery = (newQuery: string) => setQery(newQuery);

  const readyTodos = useMemo(
    () => filterTodo(todos, qery, status),
    [todos, qery, status],
  );

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(e => console.error(e))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                handleChangeStatus={handleChangeStatus}
                onChangeQuery={onChangeQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}

              {!loader && (
                <TodoList
                  todos={readyTodos}
                  selectTodo={selectTodo}
                  handleSelect={handleSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal
          selectTodo={selectTodo}
          handledeleteSelect={handledeleteSelect}
        />
      )}
    </>
  );
};
