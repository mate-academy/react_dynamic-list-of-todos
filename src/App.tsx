import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

import { FilterType } from './types/FilterType';

const getTodoById = (selectedId: number, todosArr: Todo[]) => {
  return todosArr.find(({ id }) => id === selectedId);
};

const filterTodoByStatus = (status: string, todosArr: Todo[]) => {
  if (status === 'all') {
    return todosArr;
  }

  let filteredTodos;

  switch (status) {
    case 'active':
      filteredTodos = todosArr.filter(({ completed }) => !completed);
      break;
    case 'completed':
      filteredTodos = todosArr.filter(({ completed }) => completed);
      break;
    default:
      filteredTodos = todosArr;
  }

  return filteredTodos;
};

const filterTodosBySearchQuery = (query: string, todosArr: Todo[]) => {
  return query === ''
    ? todosArr
    : todosArr.filter(({ title }) => title.toLocaleLowerCase().includes(query));
};

export const App: React.FC = () => {
  const [loadingTodoList, setLoadingTodoList] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filterType, setFilterType] = useState<string>(FilterType.All);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onSelect = (id: number) => {
    setSelectedTodoId(id);
  };

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        setTodos([...todosFromServer]);
        setLoadingTodoList(false);
      })
      .catch(() => {
        setLoadingTodoList(false);
        setLoadingError(true);
      });
  }, []);

  const filteredByStatus = useMemo(() => {
    return filterTodoByStatus(filterType, todos);
  }, [filterType, todos]);

  const todosToShow = useMemo(() => {
    return filterTodosBySearchQuery(searchQuery, filteredByStatus);
  }, [searchQuery, filteredByStatus]);

  const selectedTodo = getTodoById(selectedTodoId, todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                setFilterType={setFilterType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {loadingTodoList && !loadingError && <Loader />}

              {!loadingTodoList && !loadingError && (
                <TodoList
                  todos={todosToShow}
                  selectedTodoId={selectedTodoId}
                  onSelect={onSelect}
                />
              )}

              {!loadingTodoList && loadingError && (
                <div className="notification is-danger is-light">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    type="button"
                    className="delete"
                    // eslint-disable-next-line no-restricted-globals
                    onClick={() => location.reload()}
                  />
                  Error occurred: loading is unsuccess because of some reason.
                  Try to reload page, or close this massage to auto-reload.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
